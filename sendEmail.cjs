const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password', // Use an App Password for Gmail, not your login password
  },
});

const mailOptions = {
  from: 'your-email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Here is your postcard!',
  html: '<h1>Hello!</h1><p>Check out this image below:</p><img src="cid:unique@postcard.img"/>',
  attachments: [
    {
      filename: 'postcard.jpg',
      path: './images/postcard.jpg',
      cid: 'unique@postcard.img', // same CID as used in the HTML img tag
    },
  ],
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
}); 