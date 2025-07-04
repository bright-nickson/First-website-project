const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// Allow form submissions from your HTML page
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/Send.js', async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        phone,
        message,
        enquiries
    } = req.body;

 // Set up nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // or your email provider
        auth: {
            user: 'brightnickson63@gmail.com',      // <-- replace with your email
            pass: 'lbxq dxwg opwu arno'        // <-- replace with your email password or app password
        }
    });

    // Email content
    let mailOptions = {
        from: email,
        to: 'brightnickson63@gmail.com',           // <-- replace with your email
        subject: 'New Contact Form Submission',
        text: `
Name: ${firstname} ${lastname}
Email: ${email}
Phone: ${phone}
Message: ${message}
Purpose: ${enquiries}
        `
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.send('<h2>Thank you for contacting us! Your message has been sent.</h2>');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('<h2>Sorry, there was an error sending your message.</h2>');
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});