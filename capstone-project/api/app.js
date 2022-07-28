const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const twilioClient = require('twilio')(process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET, { accountSid: process.env.TWILIO_ACCOUNT_SID });

const findOrCreateRoom = async (roomName) => {

    try {
        // see if the room exists already. If it doesn't, this will throw error 20404.
        await twilioClient.video.rooms(roomName).fetch();
        
    } catch (error) {
        // the room was not found, so create it
        if (error.code == 20404) {
        await twilioClient.video.rooms.create({
            uniqueName: roomName,
            type: "go",
        });
        } else {
        // let other errors bubble up
        throw error;
        }
    }
};

const getAccessToken = (roomName, identity) => {

    // create an access token
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY_SID,
        process.env.TWILIO_API_KEY_SECRET,
        // set identity of the participant
        { identity: identity }
    );

    // create a video grant for this specific room
    const videoGrant = new VideoGrant({
        room: roomName,
    });
    
    // add the video grant
    token.addGrant(videoGrant);

    // serialize the token and return it
    return token.toJwt();
};

const authRoutes = require("./routes/auth")

const security = require("./middleware/security")

const { NotFoundError } = require("./utils/errors")

const app = express();

// checks if a token exists for every request,
// attach decoded user to res.locals if exists
app.use(security.extractUserFromJwt)

// enable cross-origin resource sharing for all origins for all requests
app.use(cors())

// log requests info
app.use(morgan("tiny"))

// parse incoming requests with JSON payloads
app.use(express.json())

app.use("/auth", authRoutes)

app.get("/", (req, res, next) => {
    res.status(200).json({"ping": "pong"})
})

app.post("/join-room", async (req, res) => {
    // return 400 if the request has an empty body or no roomName
    if (!req.body || !req.body.roomName) {
      return res.status(400).send("Must include roomName argument.");
    }

    const roomName = req.body.roomName;
    const identity = req.body.identity;

    // find or create a room with the given roomName
    findOrCreateRoom(roomName);

    // // generate an Access Token for a participant in this room
    const token = getAccessToken(roomName, identity);

    res.send({
      token: token,
    });
});

// Handle 404 errors
app.use((req, res, next) => {
    next(new NotFoundError())
})

// Generic error handler
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status },
    })
})
  
module.exports = app;