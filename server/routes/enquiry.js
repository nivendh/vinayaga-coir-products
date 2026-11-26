import express from 'express';
import { body, validationResult } from 'express-validator';
import sendEmail from '../utils/sendEmail.js';
import { saveCustomerData, sendToGoogleSheets } from '../utils/csvStorage.js';

const router = express.Router();

/**
 * POST /api/enquiry
 * Accepts enquiry form data, validates, saves to MongoDB, and sends email notification.
 */
router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 100 })
      .withMessage('Name cannot exceed 100 characters'),

    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^\+?[\d\s-]{7,15}$/)
      .withMessage('Enter a valid phone number (7-15 digits)'),

    body('email')
      .optional({ values: 'falsy' })
      .trim()
      .isEmail()
      .withMessage('Enter a valid email address')
      .normalizeEmail(),

    body('location')
      .optional({ values: 'falsy' })
      .trim()
      .isLength({ max: 200 })
      .withMessage('Location cannot exceed 200 characters'),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array().map((err) => ({
            field: err.path,
            message: err.msg,
          })),
        });
      }

      const { name, phone, location, email } = req.body;

      const enquiry = {
        id: 'enq_' + Math.random().toString(36).substring(2, 9),
        name,
        phone,
        location: location || '',
        email: email || '',
        createdAt: new Date().toISOString(),
      };

      console.log(`📋 New enquiry submitted: ${name} (${phone})`);

      // Save to local JSON archive (non-blocking)
      try {
        const fs = await import('node:fs/promises');
        const path = await import('node:path');
        const filePath = path.resolve('enquiries.json');
        
        let enquiries = [];
        try {
          const data = await fs.readFile(filePath, 'utf8');
          enquiries = JSON.parse(data);
        } catch (readError) {
          // File doesn't exist or is empty/corrupt
        }

        enquiries.push(enquiry);
        await fs.writeFile(filePath, JSON.stringify(enquiries, null, 2), 'utf8');
        console.log(`💾 Persisted enquiry to: ${filePath}`);
      } catch (fsError) {
        console.error('⚠️ Could not save enquiry to enquiries.json:', fsError.message);
      }

      // Save to local CSV and synchronize with Google Sheets (non-blocking)
      saveCustomerData(name, phone, location, email);
      sendToGoogleSheets(name, phone, location, email);

      // Send email notification (non-blocking — failures are logged, not thrown)
      sendEmail({ name, phone, location, email });

      return res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully! We will contact you shortly.',
        data: enquiry,
      });
    } catch (error) {
      console.error('❌ Error saving enquiry:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
      });
    }
  }
);

export default router;
