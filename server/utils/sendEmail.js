import nodemailer from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Send an email notification when a new enquiry is submitted.
 * Fails gracefully — logs the error but does not throw.
 */
export default async function sendEmail(enquiryData) {
  const { name, phone, location, email } = enquiryData;

  // 1. Try sending via Resend API (HTTP-based, never blocked by Render's firewall)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && resendApiKey.trim() !== '') {
    console.log(`📡 Sending email notification via Resend API for: ${name}...`);
    try {
      const payload = {
        from: 'Vinayaga Coir Website <onboarding@resend.dev>',
        to: process.env.EMAIL_TO || 'nivendhan03@gmail.com',
        subject: `🌿 New Enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #2E7D32; padding: 20px; color: #ffffff;">
              <h2 style="margin: 0;">🌿 New Enquiry Received</h2>
            </div>
            <div style="padding: 20px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Location:</strong> ${location || 'Not provided'}</p>
              <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            </div>
          </div>
        `,
      };

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey.trim()}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(`✅ Email notification sent successfully via Resend for: ${name}`);
        return;
      } else {
        const errorText = await response.text();
        console.error(`❌ Resend API failed with status ${response.status}: ${errorText}`);
      }
    } catch (resendError) {
      console.error('❌ Resend API connection error:', resendError.message);
    }
    console.log('🔄 Falling back to SMTP configuration...');
  }

  // 2. Fallback: Gmail SMTP (Note: Usually blocked on Render unless SMTP ports are unblocked by support)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ SMTP credentials not configured. Skipping fallback email notification.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2E7D32, #1B5E20); padding: 24px 30px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">🌿 New Enquiry Received</h1>
        <p style="color: #C8E6C9; margin: 6px 0 0; font-size: 14px;">Vinayaga Coir Products</p>
      </div>
      <div style="padding: 28px 30px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px; width: 120px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; font-weight: 600; color: #1B1B1B;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #1B1B1B;">
              <a href="tel:${phone}" style="color: #2E7D32; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Location</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #1B1B1B;">${location || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #888; font-size: 13px;">Email</td>
            <td style="padding: 12px 0; font-size: 15px; color: #1B1B1B;">
              ${email ? `<a href="mailto:${email}" style="color: #2E7D32; text-decoration: none;">${email}</a>` : 'Not provided'}
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Vinayaga Coir Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `🌿 New Enquiry from ${name} (SMTP)`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email notification sent for enquiry from: ${name} (SMTP)`);
  } catch (error) {
    console.error('❌ Failed to send email notification:', error.message);
  }
}
