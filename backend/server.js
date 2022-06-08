const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const db = require("./routes/Roles");
const Role = db.role;
const userRegister = require("./routes/auth")
const userLogin = require("./routes/login")
const userRoute = require("./routes/users")
const fileUpload = require('express-fileupload');
const cookieSession = require("cookie-session");
const articleRoute = require('./routes/articlesRoutes/articlesRoutes');
const typeRoute = require('./routes/typesRoute/typesRoute');
const attributeRoute = require('./routes/attributeRoute/attributesRoute')
const filesRoute = require('./routes/filesRoute/filesRoute')
const rulesRoute = require('./routes/rulesRoute/rules')
const authorRoute = require('./routes/authorsRoutes/authorsRoute')
const bodyParser = require('body-parser')
const viewRoute = require('./routes/viewRoute');
const demandRoute = require('./routes/demandRoute/demandRoute');
const feedbackRoute=require('./routes/feedbackRoute/feedRoute')
const favoriteRoute=require('./routes/favoriteRoute/favoriteRoute')
const rooms = ['general', 'tech', 'finance', 'crypto'];
const cors = require("cors");

const http = require('http');
const Files = require("./model/Files");
const User = require("./model/user");
const Message = require("./model/Message");

app.use(bodyParser.json())

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  },
});

app.use(cors());

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user => user.username === username) &&
    onlineUsers.push({ username, socketId })
  )
}
const removeUser = (socketId) => {

  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}
io.on("connection", (socket) => {

  console.log("connected to socket .io", socket);
  
  socket.on('setup', (username) => {
    socket.on('setup', (userData) => {
      addNewUser(username, socket.id)
    })
  });  


  socket.on("initial_data", async () => {
    const feed = await Files.find({}).sort({createdAt: -1});
    io.sockets.emit("get_data", feed);
  });

  // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
  // socket.on("post_data", async (body) => {
  //   const title = body;
  //   const feed = new Feed({ title });
  //   await feed.save();
  //   io.sockets.emit("change_data");
  // });

  socket.on("check_all_notifications", async () => {
    const files = await Files.find({}).sort({createdAt:-1}).limit(5);

    files.forEach((file) => {
      file.read = true;
    });

    await Files.create(files)
    
    io.sockets.emit("change_data");
  });

  socket.on("disconnect", () => [
    // console.log("someone has left")
    removeUser(socket.id)
  ])
});



mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  }).catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

//       app.use(bodyParser.json({limit: '50mb'}));

app.use(express.json());
//app.use(express.bodyParser);

// Start the server in port 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`your server is running on on port ${PORT}`);
});
// cookie session
app.use(
  cookieSession({
    name: "revue-app-session",
    secret: process.env.SECRET_Key,
    httpOnly: true
  })
);
// for upload user image
app.use(
  fileUpload()
);

async function getLastMessagesFromRoom(room){
  let roomMessages = await Message.aggregate([
    {$match: {to: room}},
    {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
  ])
  return roomMessages;
}

function sortRoomMessagesByDate(messages){
  return messages.sort(function(a, b){
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1]
    date2 =  date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1
  })
}

// socket connection

io.on("connection", (socket) => {

  socket.on('new-user', async ()=> {
    const members = await User.find();
    io.emit('new-user', members)
  })

  socket.on('join-room', async(newRoom, previousRoom)=> {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages)
  })

  socket.on('message-room', async(room, content, sender, time, date) => {
    const newMessage = await Message.create({content, from: sender, time, date, to: room});
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room)
  })

  

})


app.get('/rooms', (req, res)=> {
  res.json(rooms)
})


// routes 
app.use('/api/auth/', userRegister);
app.use('/api/auth/', userLogin);
app.use('/api/user', userRoute);
app.use('/api/articles', articleRoute);
app.use('/api/type', typeRoute);
app.use('/api/attribute', attributeRoute);
app.use('/api/file', filesRoute);
app.use('/api/rule', rulesRoute);
app.use('/api/author', authorRoute);
app.use('/api/demand', demandRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/favorite', favoriteRoute);
app.use('/api/view', viewRoute);


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "User"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'User' to roles collection");
      });
      new Role({
        name: "Author"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Author' to roles collection");
      });
      new Role({
        name: "Reader"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Reader' to roles collection");
      });
      new Role({
        name: "Editor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Editor' to roles collection");
      });

    }
  });
}