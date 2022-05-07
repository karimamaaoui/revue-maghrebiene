import { Server } from "socket.io";

console.log("hello")
const io = new Server({
    cors:{
        origin:'http://localhost:3000'
    }
 });

 let onlineUsers=[];

const addNewUser=(username,socketId)=>
{
    !onlineUsers.some((user=>user.username===username) &&
        onlineUsers.push({username,socketId})
    )
}
const removeUser=(socketId)=>{

    onlineUsers=onlineUsers.filter((user)=>user.socketId !==socketId);
}

const getUser=(username)=>{
    return onlineUsers.find((user)=>user.username===username);
}

io.on("connection", (socket) => {

    console.log("connected to socket .io");
    //    socket.on('setup',(userData)=>{
    //         socket.join(userData._id);
    //         console.log("user data id",userData._id)
    //       socket.emit('connected');
    //       })
    //    io.to('dfdsff').emit('firstevent',"hello this it first event")

    socket.on('setup',(username)=>{
        socket.on('setup',(userData)=>{
            addNewUser(username,socket.id)
        })
    })

    socket.on("disconnect",()=>[
       // console.log("someone has left")
        removeUser(socket.id)
    ])
});


io.listen(4000);


/***
 * 
 * 
 * 
const io=require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin: "http://localhost:3000/"
  },
});

// //create a connexion
// io.on("connection",(socket)=>{
//   console.log("connected to socket .io");
//   // socket.on('setup',(userInfo)=>{
//   //     socket.join(userInfo._id);
//   //     console.log(userInfo._id)
//   //     socket.emit('connected');
//   // })
//   io.emit('firstevent',"hello this it test");

// })



io.on("connection", (socket) => {
  
  console.log("connected to socket .io",socket);
  io.emit('firstevent',"hello this it test");

  socket.on("disconnect",()=>[
      console.log("someone has left")

  ])
});


 */