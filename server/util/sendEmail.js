import nodemailer from 'nodemailer';

const { EMAIL, PASS } = process.env;
const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASS,
    }
});

//Test trasnported
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for message: " + success)
    }
});

export const sendEmail = async (mailOption) => {
    try {
        const info = await transporter.sendMail(mailOption);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
}

export const sendVerificationEmail = (to, link) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // your email address
        pass: process.env.PASS, // your email password
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Email Verification",
      html: `<div style="padding: 30px; background-color: #3758F9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
          <p style="fontSize: 28px; color: #fff;"><a style="color: #fff; textDecoration: underline" href="${link}">LOGIN WITH THIS LINK TO VERIFY YOUR EMAIL</a></p>
       </div>`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };