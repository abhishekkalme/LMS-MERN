/**
 * Email HTML Templates for JIT Learning System
 */

const resetPasswordTemplate = (link, name = "User") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Nunito', sans-serif;
      background-color: #f9f9f9;
      padding: 0;
      margin: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      text-align: center;
      background-color: #4f46e5;
      color: white;
      padding: 1.5rem 0;
      border-radius: 8px 8px 0 0;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      margin-top: 2rem;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: #4f46e5;
      color: #fff;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 1rem;
    }
    .footer {
      font-size: 14px;
      color: #6b7280;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>JIT Learning System</h2>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to continue:</p>
      <a href="${link}" class="btn">Reset Password</a>
      <p style="margin-top: 1rem;">This link is valid for <strong>15 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:lms.secure.access@gmail.com">lms.secure.access@gmail.com</a></p>
      <p>© 2025 JIT Learning System. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const otpHtmlTemplate = (otp, name = "User") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Nunito', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: auto;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: #365cce;
      color: #fff;
      padding: 1.5rem 1rem;
      text-align: center;
    }

    .header h2 {
      margin: 0;
      font-size: 24px;
    }

    .sub-header {
      font-size: 14px;
      margin-top: 0.75rem;
    }

    .verify-title {
      font-size: 20px;
      font-weight: bold;
      margin-top: 0.75rem;
      text-transform: capitalize;
    }

    .content {
      padding: 1.5rem 1rem;
      color: #4b5563;
    }

    .content h4 {
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .otp-container {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .otp-digit {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid #365cce;
    border-radius: 0.25rem;
    font-size: 20px;
    font-weight: bold;
    color: #365cce;
    text-align: center;
    line-height: 2.5rem; 
    box-sizing: border-box;
  }

    .button {
      display: inline-block;
      margin-top: 1.5rem;
      background-color: #f97316;
      color: #fff;
      padding: 0.5rem 1.25rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      font-size: 14px;
    }

    .footer {
      text-align: center;
      font-size: 13px;
      color: #7b8794;
      padding: 1rem;
    }

    .contact {
      background-color: #f3f4f6;
      padding: 1.25rem;
      text-align: center;
    }

    .contact h1 {
      font-size: 18px;
      color: #365cce;
      margin: 0 0 0.5rem;
    }

    .contact a {
      display: block;
      color: #4b5563;
      text-decoration: none;
      margin-top: 0.25rem;
    }

    .footer-bottom {
      background-color: #365cce;
      color: #fff;
      text-align: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 0 0 8px 8px;
    }

    @media screen and (max-width: 480px) {
      .otp-digit {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 24px;
      line-height: 3rem; 
      }

      .header h2 {
        font-size: 20px;
      }

      .verify-title {
        font-size: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>JIT Learning System</h2>
      <div class="sub-header">THANKS FOR SIGNING UP!</div>
      <div class="verify-title">Verify your email address</div>
    </div>

    <div class="content">
      <h4>Hello ${name},</h4>
      <p>Please use the following One Time Password (OTP):</p>
      <div class="otp-container">
        ${otp
          .split("")
          .map((digit) => `<div class="otp-digit">${digit}</div>`)
          .join("")}
      </div>
      <p style="margin-top: 1rem;">
        This passcode will be valid for the next <strong>10 minutes</strong>.
      </p>
      <a href="#" class="button">Verify Email</a>
      <p style="margin-top: 2rem;">
        Thank you,<br />JIT Learning System Team
      </p>
    </div>

    <div class="footer">
      This email was sent from
      <a href="mailto:lms.secure.access@gmail.com" style="color: #365cce;">lms.secure.access@gmail.com</a>
    </div>

    <div class="contact">
      <h1>Get in touch</h1>
      <a href="mailto:lms.secure.access@gmail.com">lms.secure.access@gmail.com</a>
    </div>

    <div class="footer-bottom">
      © 2025 JIT Learning System. All Rights Reserved.
    </div>
  </div>
</body>
</html>
`;

module.exports = { resetPasswordTemplate, otpHtmlTemplate };
