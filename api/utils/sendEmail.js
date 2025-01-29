import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const sendEmail = async (
  sent_from,
  send_to,
  reply_to,
  subject,
  template,
  name,
  link
) => {
  // Create mail transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: "gmail",
    port: "587",
    // secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // for some security checks like 'https'
    // for setting rejects or unauthorized to false
    // prevent not to make any issue for sending email
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Nodemailer express handlebars for creating templates - template engine
  const handlebarOptions = {
    viewEngine: {
      extensionName: ".handlebars",
      partialsDir: path.resolve("./api/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./api/views"),
    extensionName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  // Options for sending mail
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject,
    template,
    context: {
      name,
      link,
    },
  };

  // Send mail
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
      /* return res
        .status(401)
        .json({ success: false, message: "Email not send" }); */
    } else {
      console.log(info);
      /* res
        .status(200)
        .json({ success: true, message: "Email sent successfully" }); */
    }
  });
};

export default sendEmail;
