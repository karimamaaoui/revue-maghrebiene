const nodemailer=require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'scongresses@gmail.com',
        pass: 'rqad xtfl ijhq omdo'
    }
});
  

module.exports = {
transporter
  };