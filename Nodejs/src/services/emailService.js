require("dotenv").config();
import { reject } from "lodash";
import nodemailer from "nodemailer";
import { resolve } from "path";
const https = require("https");

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Hongcute 👻" <kieuhong05102002@gmail.com>', // sender address
    //from: "kieuhong05102002@gmail.com", // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });

  let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
      result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên website DoctorHeath</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link 
        bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div><a href=${dataSend.redirectLink} target="_blank"> Click here</a></div>
        <div>Xin chân thành cảm ơn!</div>
        `;
    }
    if (dataSend.language === "en") {
      result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>You are receiving this email because you have scheduled a medical appointment on the DoctorHealth website.</p>
        <p>Appointment Details:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the appointment booking process.</p>
        <div><a href=${dataSend.redirectLink} target="_blank"> Click here</a></div>
        <div>Thank you very much!</div>
        `;
    }
    return result;
  };
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Chúng tôi xin gửi đến bạn kết quả của cuộc khám bệnh gần đây tại DoctorHealth.</p>
        <p>Dưới đây là những thông tin chi tiết:</p>
        <p>Nếu có bất kỳ câu hỏi hoặc cần thêm thông tin, vui lòng liên hệ với chúng tôi qua số điện thoại 0982650713 hoặc email kieuhong05102002@gmail.com.
        </p>
        <div>Xin chân thành cảm ơn!</div>
        `;
  }
  if (dataSend.language === "en") {
    result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>We are writing to provide you with the results of your recent medical examination.</p>
        <p>Below are the detailed information:</p>
        <p>If you have any questions or need further information, please feel free to contact us at 0982650713 or via email at kieuhong05102002@gmail.com.
        </p>
        <div>Thank you sincerely!</div>
        `;
  }
  return result;
};

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: '"Hongcute 👻" <kieuhong05102002@gmail.com>', // sender address
        //from: "kieuhong05102002@gmail.com", // sender address
        to: dataSend.email, // list of receivers
        subject: "Phiếu trả kết quả khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [
          {
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
