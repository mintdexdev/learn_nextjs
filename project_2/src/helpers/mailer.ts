import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'
type EmailType = {
  email: string,
  emailType: string,
  userId: string
}

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    dbConnect()

    const hashedToken = await bcryptjs.hash(userId, 10)
    const expiryTime = Date.now() + 3600000;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: expiryTime,
      })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: expiryTime,
      })
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD, 
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Password",
      // text: "Hello world?",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
    }

    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;

  } catch (error: any) {
    console.error("__Internal Server Error__ \n during: Sending Email")
    throw new Error(error, error.message)
  }
}

