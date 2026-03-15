const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const escapeHtml = (str) => String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const mailOptions = {
        from: `"${escapeHtml(name)}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: escapeHtml(email), 
        subject: "New Contact Message",
        html: `
          <h3>New Message Received</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong><br/>${escapeHtml(message)}</p>
        `,
      };
      

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

module.exports = router;
