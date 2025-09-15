// const express = require("express");
// const db=require("./firestore.js")
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// const { doc,  setDoc, serverTimestamp}= require ("firebase/firestore")
import express from "express";
import { DB } from "./firestore.js";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const app = express();
const server = http.createServer(app);
const users = {};
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "https://chatly-test.vercel.app",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("register", (data) => {
    const ref = doc(DB, "userStatus", data.phone);
    setDoc(ref, {
      isOnline: true,
      lastSeen: serverTimestamp(),
    });
    users[data.phone] = socket.id;
    console.log(`User ${data.phone} connected with socket ID: ${socket.id}`);
  });
  socket.on("disconnect", () => {
    // Remove the disconnected user from your mapping
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        const ref = doc(DB, "userStatus", userId);
        setDoc(ref, {
          isOnline: false,
          lastSeen: serverTimestamp(),
        });
        console.log(`User ${userId} disconnected.`);
        break;
      }
    }
  });

  socket.on("send_message", (data) => {
    socket
      .to(users[data.reciverPhone])
      .emit("recieve_message", {
        senderPhone: data.senderPhone,
        message: data.message,
      });
    console.log("message sended to " + data.reciverPhone);
  });
});
server.listen(5000, () => {
  console.log("server is running");
});
