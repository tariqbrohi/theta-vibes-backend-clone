const nodemailer = require("nodemailer");
const fs = require("fs");

async function sendEmail(to, firstName, lastName, link, type, code) {
  let file;
  let subject;
  if (type === "passwordReset") {
    file = fs.readFileSync("assets/templates/forgotPassword.html", {
      encoding: "utf-8",
    });
    file = file.replace("$code", code);
    subject = "Reset Standout Specialities Password";
  } else {
    file = fs.readFileSync("assets/templates/welcome.html", {
      encoding: "utf-8",
    });
    file = file.replace("$link", link);
    subject = "Welcome to Theta Vibes";
  }
  file = file.replace("$name", `${firstName} ${lastName}`);

  return await send(to, file, subject);
}

async function send(to, html, subject) {
  try {
    let from = process.env.SENDER_EMAIL;
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: from,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Theta Vibes" ' + from,
      to: to,
      subject: subject,
      html: html,
      //   attachments: [
      //     {
      //       filename: "black_logo.png",
      //       path: "./assets/black_logo.png",
      //       cid: "standoutSpecialities",
      //     },
      //   ],
    });
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  sendEmail,
};
