const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create Email Transporter


  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  // Option for sending email
  const mailOption = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOption);

};

module.exports = sendEmail;
