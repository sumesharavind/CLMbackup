import { createTransport } from "nodemailer";

// Create a nodemailer transporter
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "savictek@gmail.com", // Your Gmail email address
    pass: "oimn bmbj wokf rvkj", // Your Gmail email password (use an app password for security)
  },
});

// Function to send email
const sendEmail = async (emailData) => {
  try {
    // Replace these values with your actual email configuration
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "savictek@gmail.com",
        pass: "oimn bmbj wokf rvkj",
      },
    });
    // Create the email body
    const mailOptions = {
      from: `${emailData.SenderName} <${emailData.SenderEmail}>`,
      to: `${emailData.RecipientName} <${emailData.RecipientEmail}>`,
      subject: emailData.Subject,
      text: emailData.Message,
    };
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error(error);
  }
};
export default sendEmail;
