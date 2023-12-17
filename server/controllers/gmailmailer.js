const { EMAIL, PASSWORD } = require("../env.js");

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const signUp = async (req, res) => {
  /** Testing Account */

  let testAccount = await nodemailer.createTestAccount();

  res.status(201).join("Sign Up Successful");

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.password,
    },
  });

  // send mail with defined transport object
  const message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter.sendMail(message).then((info) => {
    return res
      .status(201)
      .json({
        msg: "You should receive an email shortly",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  });
};

/** SEND EMAIL FROM REAL GMAIL ACCOUNT */

const sendGmail = (req, res) => {
  //Getting email from user
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      password: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  //Generate Email
  let respose = {
    body: {
      name,
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

  let mail = MailGenerator.generate(respose);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Welcome to Nodemailer",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(201)
        .json({ msg: "You should receive an email shortly" });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  res.status(201).join("Sign Up Successful");
};

module.exports = { signUp, sendGmail };
