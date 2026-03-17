import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Endpoint to send emails
app.post('/api/contact', async (req, res) => {
    const { fullName, email, serviceInterest, message } = req.body;

    if (!fullName || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const mailOptions = {
        from: `"${fullName}" <${process.env.EMAIL_USER}>`,
        to: 'akashvichu576@gmail.com',
        replyTo: email,
        subject: `New Contact Form Submission from ${fullName}`,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Inquiry Received</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Interested In:</strong> ${serviceInterest || 'Not specified'}</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #888; margin-top: 30px;">This message was sent via the contact form on your website.</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error.message);
        console.error('Error code:', error.code);
        console.error('Full error:', error);
        res.status(500).json({ success: false, message: 'Failed to send the message. Please try again later.' });
    }
});

console.log('EMAIL_USER loaded:', process.env.EMAIL_USER ? 'Yes' : 'No');
console.log('EMAIL_PASS loaded:', process.env.EMAIL_PASS ? 'Yes' : 'No');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
