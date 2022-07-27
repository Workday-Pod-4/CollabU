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
let rooms = {}
let userSockets = {}

io.on("connection", (socket) => {

    console.log("The number of connected sockets: " + socket.adapter.sids.size);
    console.log('User '+ socket.id + 'is online');

    socket.on('submit', (data) => {

      let user = {
        name: data.user.username,
        activity: data.user.activity,
        topic: data.user.topic,
        subject: data.user.subject,
        industry: data.user.industry,
        workType: data.user.workType,
        socket_id: socket.id
      }

      userSockets[socket.id] = socket;

      /* 
        Checks if queue is empty, if empty, pushes user's socket to the queue
        if not empty, a random user in queue is returned and two sockets join a room together
        sends redirect url back to client side
      */
      if (queue.length == 0) {
        
        queue.push(user);
  
      } else {

        let count = 0
        let peer = {}
        let foundMatch = false;

        while (count < 50) {

          for (person = 0; person < queue.length; person++) {

            if (user.subject === queue[person].subject || user.workType === queue[person].workType) {
              peer = queue[person]
              foundMatch = true
              break;
            } else if (user.topic === queue[person].topic && user.industry === queue[person].industry && count === 49) {
              peer = queue[person]
              foundMatch = true
              break;
            } else if (user.activity === queue[person].activity && count === 1) {
              peer = queue[person]
              foundMatch = true
              break;
            } else {
              console.log("We can't find a match")
            }
          }

          if (foundMatch) break;
          count++
        }

        if (Object.keys(peer).length !== 0) {

          let room = crypto.randomBytes(20).toString('hex');

          let peerSocket = userSockets[peer.socket_id]

          console.log("User", user)
          console.log("Peer", peer)

          // join them both
          peerSocket.join(room)
          socket.join(room);

          // register rooms to their socket ids
          rooms[peer.socket_id] = room;
          rooms[socket.id] = room;

          // redirect the pair to room component
          peerSocket.emit('redirectToRoom', `http://localhost:3000/room/${room}`);
          socket.emit('redirectToRoom', `http://localhost:3000/room/${room}`);
        }
    }
    });
  
    socket.on('disconnect', () => {
      socket.removeAllListeners();
   });

  });