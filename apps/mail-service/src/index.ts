import { Worker, Job } from "bullmq";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

const emailSubjects = {
  verifyEmail: "Verify Your Email for Chai Story",
  welcome: "Welcome to Chai Story",
  passwordReset: "Reset Your Password for Chai Story",
  notification: "New Notification from Chai Story",
  default: "Email front Chai Story",
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

const worker = new Worker(
  "chai-queue",
  async (job: Job) => {
    let subject: string;
    switch (job.data.subject) {
      case "verifyEmail":
        subject = emailSubjects.verifyEmail;
        break;
      default:
        subject = emailSubjects.default;
    }

    const templatePath = path.resolve(
      __dirname,
      `../templates/${job.data.subject}.html`
    );

    console.log(templatePath);
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");
    const htmlContent = htmlTemplate
      .replace("{{username}}", job.data.username)
      .replace(
        "{{activationLink}}",
        `${process.env.DOMAIL}/${process.env.ROUTE}/${job.data.token}`
      );

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: job.data.email,
      subject: subject,
      html: htmlContent,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Verification email sent: " + info.response);
    } catch (error) {
      console.error("Error sending verification email: " + error);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
      username: process.env.REDIS_USERNAME,
    },
    concurrency: 1,
  }
);
