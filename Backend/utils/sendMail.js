const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, text, html }) => {
  if (!to) throw new Error("Recipient email (to) is required");

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `\"JIT Learning System\" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("SendMail error:", error);
    throw error;
  }
};

module.exports = sendMail;
