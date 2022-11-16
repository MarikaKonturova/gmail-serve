const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL , // generated ethereal user
    pass: process.env.PASS, // generated ethereal password
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendMessage", async (req, res) => {
  let info = await transporter.sendMail({
    from: '"MY PROFILE PAGE', // sender address
    to: "healthyandhappy.cuisine@gmail.com", // list of receivers
    subject: "MY PROFILE PAGE SEND ME A MESSAGE", // Subject line
    /// text: "", // plain text body
    html: `
    <b>Привет! меня зовут ${req.body.name}</b> 
    <div>
    Вот сообщение: ${req.body.text}
    </div>
    <div>
    Мой email: ${req.body.email} 
    </div>
    <div>
    зачем-то ссылка <a href='https://www.google.com/' >ссылка</a>
    </div>
    `, // html body
  });
  res.status(201).send({body: req.body , message: 'ваше сообщение отправлено'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
