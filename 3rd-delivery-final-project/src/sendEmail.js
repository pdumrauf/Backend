const { createTransport } = require("nodemailer");

const sendMail = async (to, subject, content) => {
    const transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD,
        },
    });

    const mailOptions = {
        from: `e-commerce <${process.env.ADMIN_EMAIL}>`,
        to: to || process.env.ADMIN_EMAIL,
        subject: subject,
        html: content,
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        //console.log(response)
    } catch (e) {
        console.log(e);
    }
};

module.exports = sendMail;
