import dotenv from 'dotenv';
import path from 'path'
dotenv.config({path: path.resolve('./.env')});
import nodemailer from 'nodemailer'; 

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASS,
  },
  tls: {rejectUnauthorized: false},
  debug: false,
  logger: false,
})

async function enviaEmail (title, body, attachment, mailTO) {
    const info = await transporter.sendMail({
      from: 'GEIND <oberdan.sousa@pmm.am.gov.br>',
      to: mailTO,
      subject: title,
      text: body,
       attachments: {
       path: attachment,
        }
    })
    
    console.log(info)
}


export default enviaEmail;