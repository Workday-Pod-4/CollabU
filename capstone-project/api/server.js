const { PORT } = require("./config")
const db = require("./db")
const socket = require("socket.io")
const { v4: uuidv4 } = require("uuid");
require("colors")
const app = require("./app")

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} 🚀`)
})

const io = socket(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
})

let queue = []
let rooms = {}
let roomChatlogs = {}
let userSockets = {}

io.on("connection", (socket) => {

    console.log("The number of connected sockets: " + socket.adapter.sids.size);
    console.log('User '+ socket.id + 'is online');

    // Removes user from queue
    socket.on('remove', (data) => {
      const index = queue.findIndex(removedPerson => removedPerson.user_id === data.user.id);
      queue.splice(index, 1);
    })

    // Joins user to a room on connect
    socket.on('joinRoom', (data) => {
      socket.join(data);
    })

    // Sends chat info to everyone in the same room
    socket.on('chat message', (data) => {

      chatData = { "chatMsg": data.chatMsg, "peerUsername": data.peerUsername }

      if (roomChatlogs[data.roomID]) {
        roomChatlogs[data.roomID].push(chatData)
      } else {
        roomChatlogs[data.roomID] = []
        roomChatlogs[data.roomID].push(chatData)
      }

      io.sockets.in(data.roomID).emit('chat logs', roomChatlogs[data.roomID]);

    });

    // Find a peer for a user and then redirects them to a chatroom together
    socket.on('submit', (data) => {

      let user = {
        user_id: data.user.id,
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

              if (user.user_id !== queue[person].user_id) {
                peer = queue[person]
              }
              const index = queue.findIndex(peer => peer.user_id === queue[person].user_id);
              queue.splice(index, 1);
              foundMatch = true
              break;

            } else if (user.topic === queue[person].topic && user.industry === queue[person].industry && count === 49) {

              if (user.user_id !== queue[person].user_id) {
                peer = queue[person]
              }
              const index = queue.findIndex(peer => peer.user_id === queue[person].user_id);
              queue.splice(index, 1);
              foundMatch = true
              break;

            } else if (user.activity === queue[person].activity && count === 49) {

              if (user.user_id !== queue[person].user_id) {
                peer = queue[person]
              }
              const index = queue.findIndex(peer => peer.user_id === queue[person].user_id);
              queue.splice(index, 1);
              foundMatch = true
              break;
            }
          }

          if (foundMatch) break;
          count++
        }

        if (Object.keys(peer).length === 0) {
            queue.push(user);
        }

        if (Object.keys(peer).length !== 0) {

          // inserts the users into previously_matched table
          db.query(`
          INSERT INTO previously_matched (
              user_1_id,
              user_2_id
          )
          VALUES ($1, $2)
          RETURNING id, user_1_id, user_2_id, match_timestamp;
          `,
          [user.user_id, peer.user_id], (err, res) => {
            console.error(err);
          })

          db.query(`
          INSERT INTO previously_matched (
              user_1_id,
              user_2_id
          )
          VALUES ($1, $2)
          RETURNING id, user_1_id, user_2_id, match_timestamp;
          `,
          [peer.user_id, user.user_id], (err, res) => {
            console.error(err);
          })

          let room = uuidv4();

          let peerSocket = userSockets[peer.socket_id]

          // join them both
          peerSocket.join(room)
          socket.join(room);

          // register rooms to their socket ids
          rooms[peer.socket_id] = room;
          rooms[socket.id] = room;

          // redirect the pair to room component
          peerSocket.emit('redirectToRoom', `/room/${room}`);
          socket.emit('redirectToRoom', `/room/${room}`);
        }
    }
    });
  
    socket.on('disconnect', () => {
      socket.removeAllListeners();
   });

  });
