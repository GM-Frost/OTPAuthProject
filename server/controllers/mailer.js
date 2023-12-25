/** SENDING MAIL TO THE USER EMAIL */
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

import Mailgen from "mailgen";

//https://ethereal.email/create

// let nodeconfig = {
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, //true for 465 port, false for other ports
//   auth: {
//     user: ENV.EMAIL,
//     password: ENV.PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// };

let gmailEmail = process.env.EMAIL;
let gmailPass = process.env.APP_PASSWORD;

let config = {
  service: "gmail",
  auth: {
    user: `${gmailEmail}`,
    pass: `${gmailPass}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

let transporter = nodemailer.createTransport(config);

//Initialize Mailgen
let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

/** POST: http://localhost:8080/api/registerMail
 * @params: {
 * "username": "test",
 * "useremail": "test",
 * "text": "",
 * "subject": "",
 */
export const registerMail = async (req, res) => {
  try {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
      body: {
        name: username,
        intro:
          text || "Welcome to my app! We're very excited to have you on board.",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    var emailBody = MailGenerator.generate(email);

    let message = {
      from: gmailEmail,
      to: userEmail,
      subject: subject || "Thank you for Registering with us",
      html: emailBody,
    };

    // send mail
    await transporter.sendMail(message);

    return res.status(200).send({ msg: "You should receive an email shortly" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};

/** SEND TEST EMAIL FROM REAL GMAIL ACCOUNT */
// for Temporary use: temp-mail.org
export const sendTestEmail = async (req, res) => {
  try {
    //Getting email from user
    const { userEmail } = req.body;

    //Generate Email
    let respose = {
      body: {
        name: "Somthing from Nayan",
        intro: "Your account has been created successfully",
        table: {
          data: [
            {
              item: "Nodemailer Stack Book",
              description: "A Backend Stack Application",
              price: "$10.00",
            },
          ],
        },
        outro: "Looking forward to do business with you again!",
      },
    };

    let emailBody = MailGenerator.generate(respose);

    let message = {
      from: gmailEmail,
      to: userEmail,
      subject: "Welcome to Nodemailer",
      html: emailBody,
    };

    await transporter
      .sendMail(message)
      .then(() => {
        return res
          .status(201)
          .json({ msg: "You should receive an email shortly" });
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        return res.status(500).json({ error });
      });

    // res.status(201).json("Sign Up Successful");
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error });
  }
};
