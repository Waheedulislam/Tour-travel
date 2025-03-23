import nodemailer from 'nodemailer';

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'baoppyhossen1234@gmail.com',
      pass: 'qjbc mjdg nkan ggwx',
    },
  });

  await transporter.sendMail({
    from: '"Tour and travels ', // sender address
    to, // list of receivers
    subject, // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });
};

export default sendMail;
