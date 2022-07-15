const express = require("express")
const User = require("../models/user")
const router = express.Router()
const {createUserJwt} = require("../utils/tokens")
const security = require("../middleware/security")

router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        //get required information and create new user in the database
        const {email} = res.locals.user
        const user = await User.fetchUserByEmail(email)
        const publicUser = await User.makePublicUser(user)
        return res.status(200).json({ user: publicUser })
    } catch (err) {
        next(err)
    }
})

router.post("/login", async function (req, res, next) {
    try {
        //get user email and password and try to authenticate

        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({ token, user })
    } catch (err) {
        next(err)
    }
})

router.post("/register", async function (req, res, next) {
    try {
        //get required information and create new user in the database

        const user = await User.register(req.body)
        const token = createUserJwt(user)

        return res.status(201).json({ token, user })
    } catch (err) {
        next(err)
    }
})

router.post("/update", async function (req, res, next) {
    try {
        //get required information and create new user in the database

        const user = await User.update(req.body)
        console.log(user)
        return res.status(201).json({ user })
    } catch (err) {
        next(err)
    }
})

router.post("/cancel", async function (req, res, next) {
    try {
        //get required information and create new user in the database

        await User.cancel(req.body)
        return res.status(201).json({user: {
            email: "",
            password: ""
        }})
    } catch (err) {
        next(err)
    }
})


module.exports = router