import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  auth: {
    pass: "DomeneDevPa$$",
    user: "domene.dev@gmail.com",
  },
  service: "gmail",
});

export default async (options: nodemailer.SendMailOptions) => {
  const mailOptions = {
    ...options,
    from: "domene.dev@gmail.com",
  };
  const emailSent = await transporter.sendMail(mailOptions);
  return emailSent;
};
