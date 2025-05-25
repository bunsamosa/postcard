import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const POST = async ({ request }: RequestEvent) => {
    try {
        const { recipientEmail, imageData } = await request.json() as {
            recipientEmail: string;
            imageData: string;
        };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: 'Here is your postcard!',
            html: '<h1>Hello!</h1><p>Check out this image below:</p><img src="cid:unique@postcard.img"/>',
            attachments: [
                {
                    filename: 'postcard.jpg',
                    content: imageData.split('base64,')[1],
                    encoding: 'base64',
                    cid: 'unique@postcard.img',
                },
            ],
        };

        const info = await transporter.sendMail(mailOptions);
        return json({ success: true, message: 'Email sent successfully', info });
    } catch (error: unknown) {
        console.error('Error sending email:', error);
        return json(
            { 
                success: false, 
                message: 'Failed to send email', 
                error: error instanceof Error ? error.message : 'Unknown error' 
            },
            { status: 500 }
        );
    }
}; 