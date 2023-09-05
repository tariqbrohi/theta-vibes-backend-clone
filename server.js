const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
const routes = require("./routes");
const webhook = require("./routes/webhook.routes");
//
const {
  createNotificationHandler,
  getSingleChannelSubscribers,
} = require("./handlers/socketHandlers");
//

const db = require("./models");
const cors = require("cors");

//
const socketIO = require("socket.io");
//

dotenv.config();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// Enable CORS for multiple origins
app.use(
  cors({
    origin: [
      "http://104.248.229.187",
      "http://localhost:3000",
      "http://159.65.254.90",
      "http://127.0.0.1:5500",
      "http://146.190.50.207",
    ],
  })
);

app.use("/api/webhook", webhook);

db.sequelize.sync({ force: false });

app.use(express.json());

app.use("/api", routes);

const server = app.listen(process.env.PORT, () => {
  console.log(`App's running on port: ${process.env.PORT}`);
});

/** SOCKET LOGIC */
const userChannels = {};

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
/**..... */

io.on("connection", (socket) => {
  console.log("A user connected");

  /** USER NOTIFICATION LOGIC */
  socket.on("createUserChannel", (userId) => {
    //console.log("User Id:", userId);
    // Create a user-specific channel if not already created
    if (!userChannels[userId]) {
      userChannels[userId] = socket.id;
    }
  });

  socket.on("notifyUser", async (data) => {
    const { ChannelId, userId, message } = data;

    if (ChannelId) {
      const userIds = await getSingleChannelSubscribers(ChannelId);

      if (userIds.length > 0) {
        // Create Comment
        userIds.map(async (id) => {
          const newNotification = await createNotificationHandler(id, message);
          //check is user has a specfic channel
          if (userChannels[id]) {
            const userSocketId = userChannels[id];
            io.to(userSocketId).emit("newNotification", {
              notification: newNotification,
            });
          }
          return;
        });
      }
    } else {
      // Create Comment
      const newNotification = await createNotificationHandler(userId, message);
      //check is user has a specfic channel
      if (userChannels[userId]) {
        const userSocketId = userChannels[userId];
        io.to(userSocketId).emit("newNotification", {
          notification: newNotification,
        });
      }
    }
  });
  /**.............. */

  /** LIVE CHAT LOGIC */
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("message", (data) => {
    // Emit the message to all clients in the room
    io.to(data.room).emit("message", { userData: data.userData });
  });
  /**.............. */

  /** LIVE STREAM LOGIC  */
  //live video stream logic
  socket.on("stream", (data) => {
    // Emit the video to all clients in the room
    io.to(data.room).emit("stream", data);
  });
  /**.............. */

  socket.on("disconnect", () => {
    /** USER NOTIFICATION LOGIC */
    // Remove user-specific channel when user disconnects
    const userId = Object.keys(userChannels).find(
      (key) => userChannels[key] === socket.id
    );
    if (userId) {
      delete userChannels[userId];
    }
    /**.............. */

    console.log("A user disconnected");
  });
});
//
