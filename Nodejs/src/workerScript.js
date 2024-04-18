// workerScript.js

const { parentPort } = require("worker_threads");
const axios = require("axios");

parentPort.on("message", async (message) => {
  if (message == "Run") {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/get-book-appointment-expired"
      );
      if (response.data.length > 0) {
        parentPort.postMessage(
          "Đã cập nhật trạng thái các lịch hẹn quá hạn xác nhận"
        );
      } else {
        parentPort.postMessage("Không có lịch hẹn nào bị quá hạn xác nhận");
      }
    } catch (error) {
      console.error("Error:", error);
      parentPort.postMessage("Error occurred during API call");
    }
  }
});
