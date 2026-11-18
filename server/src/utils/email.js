/**
 * Optional Resend Email Notification Service
 * Sends notification emails when a contact or quotation inquiry is submitted.
 * If RESEND_API_KEY is not configured, logs gracefully to console without failing the submission.
 */

async function sendInquiryNotification({ type, name, email, phone, business_name, service, budget_range, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.NOTIFICATION_EMAIL || 'smvisionpixel@gmail.com';
  const sender = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || apiKey.trim() === '') {
    console.log(`[Email Service] RESEND_API_KEY not set. Skipping live email. New ${type} inquiry received from: ${name} (${email}, ${phone})`);
    return { success: true, delivered: false, reason: 'RESEND_API_KEY not configured' };
  }

  const subject = type === 'quote' 
    ? `[SM Vision Pixel] New Quote Request from ${name} - ${service}` 
    : `[SM Vision Pixel] New Contact Inquiry from ${name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0A192F; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
        SM Vision Pixel — New ${type === 'quote' ? 'Quotation Request' : 'Contact Inquiry'}
      </h2>
      <p style="color: #475569; font-size: 14px;">A new inquiry has been submitted through the agency website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; width: 35%; border-bottom: 1px solid #e2e8f0;">Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Phone:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        ${business_name ? `
        <tr>
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Business Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${business_name}</td>
        </tr>` : ''}
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Service Requested:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #2563EB; font-weight: bold;">${service}</td>
        </tr>
        ${budget_range ? `
        <tr>
          <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Budget Range:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${budget_range}</td>
        </tr>` : ''}
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; vertical-align: top; border-bottom: 1px solid #e2e8f0;">Project Details:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</td>
        </tr>
      </table>

      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
        SM Vision Pixel &bull; Creative Ideas. Stronger Brands. &bull; smvisionpixel@gmail.com &bull; +91 6386775945
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject,
        html
      })
    });

    if (!response.ok) {
      const errData = await response.text();
      console.warn('[Email Service] Resend API error response:', errData);
      return { success: false, delivered: false, error: errData };
    }

    const data = await response.json();
    console.log('[Email Service] Email sent successfully via Resend. ID:', data.id);
    return { success: true, delivered: true, id: data.id };
  } catch (error) {
    console.error('[Email Service] Failed to send email via Resend:', error.message);
    return { success: false, delivered: false, error: error.message };
  }
}

module.exports = { sendInquiryNotification };
