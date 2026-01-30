import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  console.log("Client connected");

  socket.on("sensor-data", data => {
    io.emit("sensor-update", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/esp32", (req, res) => {
  io.emit("sensor-update", req.body);
  res.send({ ok: true });
});

server.listen(3001, () => {
  console.log("Server running on 3001");
});
