const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465', // true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

/**
 * Send a booking confirmation email to the patient.
 */
const sendBookingConfirmation = async (booking) => {
  const { name, email, treatment, date, time } = booking;

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #0A84FF 0%, #00d4ff 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Appointment Confirmed! ✅</h1>
        <p style="color: rgba(255,255,255,0.9); margin-top: 8px;">Dr. Majid's Advanced Physiotherapy Clinic</p>
      </div>

      <div style="background: white; padding: 40px 30px;">
        <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>
        <p style="color: #555; line-height: 1.6;">
          Your appointment request has been <strong style="color: #22c55e;">confirmed</strong>.
          Here are your booking details:
        </p>

        <div style="background: #f0f7ff; border-left: 4px solid #0A84FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: 600; width: 40%;">Treatment</td>
              <td style="padding: 8px 0; color: #333;">${treatment}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: 600;">Date</td>
              <td style="padding: 8px 0; color: #333;">${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: 600;">Time</td>
              <td style="padding: 8px 0; color: #333;">${time}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff8ed; border: 1px solid #fde68a; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            📍 <strong>Clinic Address:</strong> Main Chowk, Sopore, Jammu & Kashmir — 193201
          </p>
          <p style="margin: 8px 0 0; color: #92400e; font-size: 14px;">
            📞 <strong>Phone:</strong> +91-9906044455
          </p>
        </div>

        <p style="color: #555; line-height: 1.6; font-size: 14px;">
          Please arrive <strong>10 minutes early</strong> and bring any previous medical reports or X-rays.
          If you need to reschedule, please contact us at least 24 hours in advance.
        </p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://wa.me/919906044455" style="background: #25d366; color: white; padding: 12px 28px; border-radius: 25px; text-decoration: none; font-weight: 600;">
            💬 Message Us on WhatsApp
          </a>
        </div>
      </div>

      <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; border-radius: 0 0 12px 12px;">
        <p style="color: #64748b; font-size: 12px; margin: 0;">
          Dr. Majid's Advanced Physiotherapy Clinic | Sopore, J&K | +91-9906044455
        </p>
        <p style="color: #94a3b8; font-size: 11px; margin-top: 4px;">
          This is an automated email. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"Dr. Majid's Clinic" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Appointment Confirmed — ${treatment} on ${new Date(date).toLocaleDateString('en-IN')}`,
    html,
  });
};

/**
 * Send a new-booking notification to the clinic admin.
 */
const sendAdminNotification = async (booking) => {
  const { name, phone, email, treatment, date, time, message } = booking;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A84FF; padding: 24px 30px;">
        <h2 style="color: white; margin: 0;">🆕 New Appointment Booking</h2>
      </div>
      <div style="background: white; padding: 30px; border: 1px solid #e2e8f0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 10px 0; color: #64748b; width: 35%;">Patient Name</td><td style="color: #1e293b; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Phone</td><td style="color: #1e293b;">${phone}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Email</td><td style="color: #1e293b;">${email || 'N/A'}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Treatment</td><td style="color: #1e293b;">${treatment}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Date</td><td style="color: #1e293b;">${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">Time</td><td style="color: #1e293b;">${time}</td></tr>
          ${message ? `<tr><td style="padding: 10px 0; color: #64748b; vertical-align: top;">Notes</td><td style="color: #1e293b;">${message}</td></tr>` : ''}
        </table>
        <div style="margin-top: 24px; text-align: center;">
          <a href="${process.env.ADMIN_URL || 'http://localhost:3000'}/admin" style="background: #0A84FF; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Open Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"Clinic Booking System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Booking: ${name} — ${treatment} on ${new Date(date).toLocaleDateString('en-IN')}`,
    html,
  });
};

/**
 * Send a booking status update email (confirmed / rejected / completed).
 */
const sendStatusUpdate = async (booking) => {
  const statusMessages = {
    confirmed: { emoji: '✅', text: 'Your appointment has been confirmed.', color: '#22c55e' },
    rejected: { emoji: '❌', text: 'Unfortunately, your appointment could not be accommodated.', color: '#ef4444' },
    completed: { emoji: '🏆', text: 'Your appointment has been marked as completed.', color: '#8b5cf6' },
    cancelled: { emoji: '🚫', text: 'Your appointment has been cancelled.', color: '#f59e0b' },
  };

  const info = statusMessages[booking.status];
  if (!info || !booking.email) return;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
      <h2 style="color: ${info.color};">${info.emoji} Appointment Update</h2>
      <p>Dear <strong>${booking.name}</strong>,</p>
      <p>${info.text}</p>
      <p><strong>Treatment:</strong> ${booking.treatment}<br>
         <strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-IN')}<br>
         <strong>Time:</strong> ${booking.time}</p>
      ${booking.notes ? `<p><strong>Note from clinic:</strong> ${booking.notes}</p>` : ''}
      <p>Questions? Call us: <a href="tel:+919906044455">+91-9906044455</a></p>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"Dr. Majid's Clinic" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: `Appointment ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} — Dr. Majid's Clinic`,
    html,
  });
};

module.exports = { sendBookingConfirmation, sendAdminNotification, sendStatusUpdate };
