const { PORT } = require("./config")
const socket = require("socket.io")
const crypto = require('crypto');
const app = require("./app")

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} 🚀`)
})

const io = socket(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

let queue = []
let rooms = {};
let names = {};
let userSocketsInQueue = {};

io.on("connection", (socket) => {

    console.log("The number of connected sockets: " + socket.adapter.sids.size);
    console.log('User '+ socket.id + 'is online');

    socket.on('submit', (data) => {

      let user = {
        name: data.user.username,
        activity: data.user.activity,
        topic: data.user.topic,
        subject: data.user.subject,
        workIndustry: data.user.workIndustry,
        workType: data.user.workType,
      }

      names[socket.id] = user;
      userSocketsInQueue[socket.id] = socket;

      /* 
        Checks if queue is empty, if empty, pushes user's socket to the queue
        if not empty, a random user in queue is returned and two sockets join a room together
        sends redirect url back to client side
      */
      if (queue.length == 0) {
        
        queue.push(socket);
  
      } else {

        let user = names[socket.id]
        console.log(names)
        
        // console.log("User", user)

        // let room = ''

        // if (user.activity == 'studying') {
        //   room = `${user.activity}/${user.topic}/${user.subject}`
        // } else if (user.activity == 'working') {
        //   room = `${user.activity}/${user.workIndustry}/${user.workType}`
        // }


      // // somebody is in queue, pair them!
      // let peer = queue.pop();

      // // join them both
      // peer.join(room);
      // socket.join(room);

      // // register rooms to their names
      // rooms[peer.id] = room;
      // rooms[socket.id] = room;

      // // redirect the pair to room component

      // peer.emit('redirectToRoom', `http://localhost:3000/room/${room}`);
      // socket.emit('redirectToRoom', `http://localhost:3000/room/${room}`);
    }
    });
  
    socket.on('disconnect', () => {
      socket.removeAllListeners();
   });
  });