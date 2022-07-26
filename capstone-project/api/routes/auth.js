const express = require("express")
const User = require("../models/user")
const router = express.Router()
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")

//shows user information from database
router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        const { email } = res.locals.user
        const user = await User.fetchUserByEmail(email)
        const publicUser = await User.makePublicUser(user)
        return res.status(200).json({ user: publicUser })
    } catch (err) {
        next(err)
    }
})

//get user email and password and try to authenticate
router.post("/login", async function (req, res, next) {
    try {
        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({ token, user })
    } catch (err) {
        next(err)
    }
})

// get required information and create new user in the database
router.post("/register", async function (req, res, next) {
    try {
        const user = await User.register(req.body)
        const token = createUserJwt(user)
        return res.status(201).json({ token, user })
    } catch (err) {
        next(err)
    }
})

// get required information and update user in the database
router.put("/update-account", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        const user = await User.update(req.body)
        return res.status(201).json({ user })
    } catch (err) {
        next(err)
    }
})

// get required information and update user in the database
router.put("/update-email", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        const user = await User.updateEmail(req.body)
        return res.status(201).json({ user })
    } catch (err) {
        next(err)
    }
})

// get required information and update user in the database
router.put("/update-password", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        const user = await User.updatePassword(req.body)
        const token = createUserJwt(user)
        return res.status(201).json({ token, user })
    } catch (err) {
        next(err)
    }
})

// delete user in database
router.delete("/delete-account", security.requireAuthenticatedUser, async function (req, res, next) {
    try {
        await User.delete(req.body)
        return res.status(201).json({user: {
            email: "",
            password: ""
        }})
    } catch (err) {
        next(err)
    }
})

module.exports = router