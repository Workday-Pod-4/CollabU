const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const db = require("./db")
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

app.get('/matches', async (req, res) => {

    let id = req.query.user_id

    // Get the previously matches from database
    const { rows } = await db.query(
        `SELECT
            DISTINCT ON (users.id)
            users.username,
            users.email,
            users.first_name, 
            users.last_name,  
            users.location,
            users.timezone,
            users.job_title,
            users.company,
            users.college,
            users.major,
            users.profile_image_url,
            users.social_media_link_1,
            users.social_media_link_2,
            users.social_media_link_3,
            previously_matched.match_timestamp
         FROM users
         JOIN previously_matched ON users.id = previously_matched.user_2_id
         WHERE user_1_id = $1
         ORDER BY users.id, previously_matched.match_timestamp DESC;`, [id]
        )

    res.send(rows)
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

app.post('/disconnect/:roomID', async (req, res) => {

    const { roomID } = req.params

    const roomSidResponse = await twilioClient.video.rooms(roomID).fetch();
    const roomSid = roomSidResponse.sid;

    try {
      await twilioClient.video.rooms(roomSid).update({status: 'completed'})
      res.status(200).end()
    } catch (error) {
      console.error(error.stack)
      res.status(500).send(error)
    }
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