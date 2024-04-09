import OTP from '../models/Otp';
import { sendEmail } from '../util/sendEmail';


const { EMAIL } = process.env;

export const sendOTP = async ({ email, subject, message, duration = 1 }) =>{
    try {
        if (!(email && subject && message )) {
            throw Error('Email, subject and message are required');
        }

        //clear any old record
        await OTP.deleOne({ email});

        //generate new pin

        const generatedOTP = await generateOTP();

        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: subject,
            text: message,
            // html: message.replace(/{{OTP}}/g, generatedOTP)
            html: `<p>${message}</p> <p style="color:tomato; font-size:25px; letter-spacing:2px; font-weight:bold">
            <b>${generatedOTP}</b></p> <p> This code <b> expires in ${duration} hours (s)</b>.</p>`,

        };

        await sendEmail(mailOptions, email)

        // save otp records
        const hashedOTP = await hashData(generatedOTP);
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expires:Date.now() + (2 * 60 * 1000), // 2 minutes in milliseconds

        });

        const createOTPRecord = await newOTP.save();
        return createOTPRecord;

    } catch (error) {
        throw error

    }
};