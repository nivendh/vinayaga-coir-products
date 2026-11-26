import fs from 'node:fs/promises';
import path from 'node:path';

const csvFilePath = path.resolve('customers.csv');

/**
 * Sanitizes a string for CSV safety by escaping double quotes, commas, and newlines.
 * Wraps values in double quotes if they contain special characters.
 */
function sanitizeForCsv(value) {
  if (value === null || value === undefined) {
    return '';
  }
  let str = String(value).trim();
  // If value contains double quotes, escape them by doubling them
  // and wrap the entire string in double quotes.
  // Also wrap if it contains commas or newlines.
  const hasQuotes = str.includes('"');
  const hasCommas = str.includes(',');
  const hasNewlines = str.includes('\n') || str.includes('\r');

  if (hasQuotes || hasCommas || hasNewlines) {
    str = str.replace(/"/g, '""');
    return `"${str}"`;
  }
  return str;
}

/**
 * Captures customer contact information and saves it into customers.csv.
 * Initializes the file with headers if it does not already exist.
 * Includes error handling to prevent application crashes.
 */
export async function saveCustomerData(name, phone, location, email) {
  try {
    // Check if the file exists by trying to access it
    let fileExists = true;
    try {
      await fs.access(csvFilePath);
    } catch {
      fileExists = false;
    }

    // Prepare header if file does not exist
    if (!fileExists) {
      const header = 'Name,Phone Number,Location,Email ID\n';
      await fs.writeFile(csvFilePath, header, 'utf8');
      console.log(`📂 Initialized customers.csv at: ${csvFilePath}`);
    }

    // Sanitize entries
    const cleanName = sanitizeForCsv(name);
    const cleanPhone = sanitizeForCsv(phone);
    const cleanLocation = sanitizeForCsv(location);
    const cleanEmail = sanitizeForCsv(email);

    // Formulate the CSV row
    const row = `${cleanName},${cleanPhone},${cleanLocation},${cleanEmail}\n`;

    // Append to file (asynchronously and safely)
    await fs.appendFile(csvFilePath, row, 'utf8');
    console.log(`💾 Appended customer data to customers.csv: ${name}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to save customer details to customers.csv:', error.message);
    // Return false instead of throwing to prevent app crash on write collisions
    return false;
  }
}

/**
 * Asynchronously posts customer info to the configured Google Sheets Webhook / Apps Script Web App URL.
 */
export async function sendToGoogleSheets(name, phone, location, email) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.trim() === '') {
    // Silent skip or log warning depending on environment configuration
    return;
  }

  try {
    const payload = {
      name: name || '',
      phone: phone || '',
      location: location || '',
      email: email || '',
      timestamp: new Date().toISOString()
    };

    console.log(`📡 Sending contact data to Google Sheets: ${name}...`);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('✅ Google Sheets sync completed successfully.');
    } else {
      console.error(`❌ Google Sheets sync failed. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Google Sheets sync connection error:', error.message);
  }
}
