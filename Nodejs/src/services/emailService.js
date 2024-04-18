import nodemailer from "nodemailer";
import { resolve } from "path";
const https = require("https");
import db from "../models/index";

const getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên website BookingCare</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Họ tên: ${dataSend.name}</b></div>
        <div><bSố điện thoại: ${dataSend.phoneNumber}</b></div>
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
        <p>You are receiving this email because you have scheduled a medical appointment on the BookingCare website.</p>
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

const sendSimpleEmail = async (dataSend) => {
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
    from: '"BookingCare <kieuhong05102002@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Kính gửi ${dataSend.patientName}!</h3>
    <p>Chúng tôi xin chân thành gửi lời cảm ơn đến bạn về việc đã tin tưởng và sử dụng dịch vụ của chúng tôi trong cuộc khám bệnh gần đây. Mong rằng bạn đã có trải nghiệm khám bệnh tốt và nhận được sự chăm sóc tận tình từ đội ngũ y bác sĩ và nhân viên y tế của chúng tôi.</p>

    <p> Để giúp bạn duy trì sức khỏe và đảm bảo việc điều trị diễn ra suôn sẻ, chúng tôi gửi kèm theo email này đơn thuốc của bạn. Đơn thuốc đã được bác sĩ kê toa và chỉ dẫn cụ thể về cách sử dụng. Vui lòng kiểm tra và thực hiện đúng hướng dẫn của bác sĩ.</p>
    <p>Thông tin đơn thuốc, hóa đơn được gửi trong file đính kèm</p>
    <div>Một lần nữa, chúng tôi xin chân thành cảm ơn sự tin tưởng và ủng hộ của bạn. Chúc bạn luôn khỏe mạnh và hạnh phúc!</div>
   <p> Trân trọng,</p>
    <b>${dataSend.doctorName}</b>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>We would like to extend our sincere thanks to you for choosing and utilizing our services during your recent medical consultation. We hope that you had a positive experience during your visit and received attentive care from our team of doctors and healthcare professionals.</p>

    <p>To assist you in maintaining your health and ensuring smooth treatment, we are attaching your prescription to this email. The prescription has been prescribed by the doctor with specific instructions on usage. Please review and follow the doctor's instructions carefully.</p>
    <p>Information on prescriptions and invoices is sent in the attached file</p>
    <div>Once again, we sincerely appreciate your trust and support. Wishing you continued health and happiness!</div>
    <p> Best regards,</p>
    <b>${dataSend.doctorName}</b>
    `;
  }
  return result;
};

const sendAttachment = async (dataSend) => {
  // console.log(dataSend);
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
        from: '"BookingCare <kieuhong05102002@gmail.com>', // sender address
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
      if (info) {
        let appointment = await db.Booking.findOne({
          where: {
            id: dataSend.patientId,
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S5";
          await appointment.save();
        }
      }
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
