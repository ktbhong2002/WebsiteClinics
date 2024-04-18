import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import { Worker } from "worker_threads";
require("dotenv").config(); // giup chay dc dong process.env
import path from "path";

let app = express();
app.use(cors({ origin: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

// Khởi tạo và sử dụng worker
const workerPath = path.join(__dirname, "workerScript.js");
const worker = new Worker(workerPath);

worker.on("message", (message) => {
  console.log("Worker message:", message);
});

worker.on("error", (error) => {
  console.error("Worker error:", error);
});

worker.on("exit", (code) => {
  console.log("Worker exit code:", code);
});

// Khởi động worker bằng cách gửi tin nhắn cho nó
worker.postMessage("Run");

// Gửi tin nhắn cho worker mỗi 3 phút
const intervalId = setInterval(() => {
  worker.postMessage("Run");
}, 60 * 60 * 1000);

// Dừng worker khi máy chủ tắt
process.on("SIGINT", () => {
  clearInterval(intervalId);
  console.log("Worker will not be terminated on server shutdown.");
  process.exit();
});

let port = process.env.PORT || 8080; //Port === undefined => Port = 6060

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is running on the port: " + port);
});
