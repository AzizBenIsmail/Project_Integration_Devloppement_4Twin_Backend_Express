var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
const User = require("./models/userSchema.js");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AuthController = require("./controllers/auth/auth-controller");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config(); //configuration dotenv
const mongoose = require("mongoose"); //configuration mongoose

const { Server } = require("socket.io");
const { PeerServer } = require("peer");
const ChatController = require("./controllers/Chat/chatController");
var app = express();

app.use(cookieParser("little_secret", { sameSite: "none" }));
app.use(
  session({
    secret: "little_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }, // 1 day}
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Configuration base de donne mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
//    connectTimeoutMS: 60000 // 30 secondes de timeout

  })
  .then(() => {
    console.log("connect to BD");
  })
  .catch((error) => {
    console.log(error.message);
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var fablabsRouter = require("./routes/fablabs");
var eventsRouter = require("./routes/events");
var projectRouter = require("./routes/project");
var investRouter = require("./routes/invest");
var messageRouter = require("./routes/messages");
var chatRoomRouter = require("./routes/chatRoom");
var recruitmentRouter = require("./routes/recruit.js");

var evaluationsRouter = require("./routes/evaluations");
var badgesRouter = require("./routes/badges");
var btypeRouter = require("./routes/btype");//charrada

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use("/auth", authRouter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/fablabs", fablabsRouter);
app.use("/events", eventsRouter);
app.use("/project", projectRouter);
app.use("/invest", investRouter);
app.get("/api/verify/:token", AuthController.verify);
app.use("/chat", messageRouter);
app.use("/chat", chatRoomRouter);
app.use("/recruit", recruitmentRouter);

app.use("/evaluations", evaluationsRouter);
app.use("/badges", badgesRouter);
app.use("/btype", btypeRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.post("/recruit/apply", async (req, res) => {
  const {
    jobOfferId,
    candidateId,
    firstName,
    lastName,
    adresse,
    resume,
    availability,
  } = req.body;

  try {
    const application = new Application({
      jobOffer: jobOfferId,
      candidate: candidateId,
      firstName,
      lastName,
      adresse,
      resume,
      availability,
      status: "pending",
    });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Define a route to get all job offers
app.get("/recruit/job-offers", async (req, res) => {
  try {
    // Find all job offers in the database
    const jobOffers = await JobOffer.find();
    // Return the job offers as a JSON array
    res.json(jobOffers);
  } catch (err) {
    // Return an error if there was a problem retrieving the job offers
    res.status(500).json({ message: err.message });
  }
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//socket thing
let onlineUsers = {};
let videoRooms = {};
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    disconnectEventHandler(socket.id);
  });
  socket.on("user-login", (data) => {
    loginEventHandler(socket, data);
  });
  socket.on("chat-message", (data) => chatMessageHandler(socket, data));
  socket.on("video-room-create", (data) => {
    videoRoomCreateHandler(socket, data);
  });

  socket.on("video-room-join", (data) => {
    videoRoomJoinHandler(socket, data);
  });

  socket.on("video-room-leave", (data) => {
    videoRoomLeaveHandler(socket, data);
  });
});

const peerServer = PeerServer({ port: 9000, path: "/peer" });

//socket events
const videoRoomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
      (p) => p.socketId !== socket.id
    );
  }

  if (videoRooms[roomId].participants.length > 0) {
    // emit an event to the user which is in the room that he should also close his peer conection
    socket
      .to(videoRooms[roomId].participants[0].socketId)
      .emit("video-call-disconnect");
  }

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  }

  broadcastVideoRooms();
};

const videoRoomJoinHandler = (socket, data) => {
  const { roomId, peerId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((participant) => {
      socket.to(participant.socketId).emit("video-room-init", {
        newParticipantPeerId: peerId,
      });
    });

    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ];

    broadcastVideoRooms();
  }
};

const videoRoomCreateHandler = (socket, data) => {
  console.log("new room", data);

  const { peerId, newRoomId } = data;

  // adding new room
  videoRooms[newRoomId] = {
    participants: [
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ],
  };

  broadcastVideoRooms();

  console.log("new room", data);
};

const disconnectEventHandler = (id) => {
  console.log(`🔥: A user disconnected ${id}`);
  removeOnlineUser(id);
  broadcastDisconnectedUserDetails(id);
};
const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
  console.log(onlineUsers);
};

const chatMessageHandler = (socket, data) => {
  const { receiverSocketId, content, id, userid, username } = data;

  ChatController.addMes(userid, username, content);
  if (onlineUsers[receiverSocketId]) {
    console.log("message received");
    console.log("sending message to other user received");

    io.to(receiverSocketId).emit("chat-message", {
      senderSocketId: socket.id,
      content,
      id,
    });
  }
};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId) => {
  io.to("logged-users").emit("user-disconnected", disconnectedUserSocketId);
};

const broadcastVideoRooms = () => {
  io.to("logged-users").emit("video-rooms", videoRooms);
};

const loginEventHandler = (socket, data) => {
  socket.join("logged-users");
  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };
  console.log(onlineUsers);
  io.to("logged-users").emit("online-users", convertOnlineUsersToArray());
  broadcastVideoRooms();
};

const convertOnlineUsersToArray = () => {
  const onlineUsersArray = [];
  Object.entries(onlineUsers).forEach(([key, value]) => {
    onlineUsersArray.push({
      socketId: key,
      username: value.username,
      coords: value.coords,
    });
  });
  return onlineUsersArray;
};

///////
server.listen(5000, () => {
  console.log("app is runnig on port 5000");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adarsh438tcsckandivali@gmail.com",
        pass: "rmdklolcsmswvyfw",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "thedebugarena@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

//reset password
app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});
