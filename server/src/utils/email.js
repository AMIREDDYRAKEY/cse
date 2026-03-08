import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async (contactData) => {
  const { name, email, message } = contactData;

  // 1. Email to Owner (rakeyr213@gmail.com)
  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: "rakeyr213@gmail.com",
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #4f46e5;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 5px; border-left: 4px solid #4f46e5;">
          ${message}
        </div>
      </div>
    `,
  };

  // 2. Confirmation Email to User
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Thank you for contacting CSE Department`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #4f46e5;">Hello ${name},</h2>
        <p>Thank you for reaching out to the Computer Science & Engineering Department. We have received your message and will get back to you shortly.</p>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #475569;">Your message:</p>
          <p style="margin: 5px 0 0 0; font-style: italic;">"${message}"</p>
        </div>
        <p>Best Regards,<br/><strong>CSE Department Team</strong></p>
      </div>
    `,
  };

  try {
    // Send both emails
    const [ownerInfo, userInfo] = await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    console.log("✅ Emails sent successfully:");
    console.log(`- Owner Notification: ${ownerInfo.messageId}`);
    console.log(`- User Confirmation: ${userInfo.messageId}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending emails:", error);
    return false;
  }
};
