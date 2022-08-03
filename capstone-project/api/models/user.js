const db = require("../db")
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class User {

    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            location: user.location,
            timezone: user.timezone,
            job_title: user.job_title,
            company: user.company,
            college: user.college,
            major: user.major,
            profile_image_url: user.profile_image_url,
            social_media_link_1: user.social_media_link_1,
            social_media_link_2: user.social_media_link_2,
            social_media_link_3: user.social_media_link_3,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
    }

    static async login(credentials) {
        // required fields are email and password, throw error if either are missing
        const requiredFields = ["email", "password"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // looks up user in database by email
        const user = await User.fetchUserByEmail(credentials.email)

        /* 
           if user is found, compare the password with the submitted password
           if they match, return user
           else, throw an error
        */
        if (user) {

            const isValid = await bcrypt.compare(credentials.password, user.password)

            if (isValid) {
                return User.makePublicUser(user)
            }
        }

        throw new UnauthorizedError("Invalid email/password")
    }

    static async register(credentials) {
        // required fields are email, username, first_name, last_name, password, throw error if any are missing or empty
        const requiredFields = ["email", "username", "first_name", "last_name", "password"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            } 
            if (credentials.hasOwnProperty(field) && credentials[field] === '') {
                throw new BadRequestError(`Cannot have empty ${field} in request body.`)
            }
        })
        
        // checks if email is in correct format, throw error if invalid
        if(credentials.email.indexOf('@') <= 0) {
            throw new BadRequestError('Invalid email')
        }

        // make sure no user in database exist with that email, throw an error if user already exist
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`User already exists`)
        }
        
        // make sure no user in database exist with that username, throw an error if user already exist
        const results = await db.query("SELECT username FROM users;")

        const usernames = results?.rows
        if (usernames.indexOf(credentials.username) !== -1) {
            throw new BadRequestError(`User already exists`)
        }

        // hashes user password
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        // lowercases email
        const lowercasedEmail = credentials.email.toLowerCase()

        //create new user in database with given info
        const result = await db.query(`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                username
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, password, first_name, last_name, username, created_at;
        `,
        [lowercasedEmail, hashedPassword, credentials.first_name, credentials.last_name, credentials.username]
        )

        // return user
        return User.makePublicUser(result.rows[0])
    }

    static async update(credentials) {
        // required fields are username, email and password, throw error if any are missing
        const requiredFields = ["username", "email"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // looks up user in database by email
        const user = await User.fetchUserByEmail(credentials.email)

        // creates new temp object from user
        const tempUser = Object.assign({}, user);
        
        /*
            if there is no field in credentials, then set the field to null
            if the credential's values are not the same in tempUser and if they're not null and aren't password and email, set tempUser values to credentials values
        */
        for (const field in tempUser) {
            
            if (credentials[field] === undefined) {
                credentials[field] = null
            }
            
            if (credentials[field] !== tempUser[field] && credentials[field] !== null && credentials[field] !== 'password' && credentials[field] !== 'email') {
                tempUser[field] = credentials[field]
            }
          }

        /* 
           if user is found, update database with given info and return user
           else, throw an error
        */
        if (user) {

            // update database with given info
                const result = await db.query(`
                    UPDATE users 
                    SET username = $2,
                        email = $3,
                        first_name = $4,
                        last_name = $5,
                        timezone = $6,
                        job_title = $7,
                        company = $8,
                        college = $9,
                        major = $10,
                        social_media_link_1 = $11,
                        social_media_link_2 = $12,
                        social_media_link_3 = $13,
                        profile_image_url = $14,
                        location = $15
                    WHERE id = $1
                    RETURNING id, email, password, username, first_name, last_name, location, timezone, job_title, company, college, major, profile_image_url, social_media_link_1, social_media_link_2, social_media_link_3;
                `,
                [user.id, tempUser.username, tempUser.email.toLowerCase(), tempUser.first_name, tempUser.last_name, tempUser.timezone, tempUser.job_title, tempUser.company, tempUser.college, tempUser.major, tempUser.social_media_link_1, tempUser.social_media_link_2, tempUser.social_media_link_3, tempUser.profile_image_url, tempUser.location]
                )

                // return user
                return User.makePublicUser(result.rows[0])
            
        }

        throw new UnauthorizedError("You're not authorized to update this user")
    }

    static async updateEmail(credentials) {
        // required fields are username, email and password, throw error if any are missing
        const requiredFields = ["username", "email", "password"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // looks up user in database by username
        const user = await User.fetchUserByUsername(credentials.username)

        /* 
           if user is found, compare the password with the submitted password
           if they match, update database with given email and return user
           else, throw an error
        */
        if (user) {

            const isValid = await bcrypt.compare(credentials.password, user.password)

            // update database with given email
            if (isValid) {
                const result = await db.query(`
                    UPDATE users 
                    SET email = $2
                        WHERE username = $1
                    RETURNING id, username, email, password, first_name, last_name;
                `,
                [credentials.username, credentials.email.toLowerCase()]
                )

                //return user
                return User.makePublicUser(result.rows[0])
            }
        }

        throw new UnauthorizedError("You're not authorized to update this user")
    }

    static async updatePassword(credentials) {
        // required fields are email and password, throw error if either are missing
        const requiredFields = ["username", "email", "password", "newPassword", "confirmNewPassword"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // throw error with password doesnt match
        if (credentials.newPassword !== credentials.confirmNewPassword) {
            throw new BadRequestError(`Password does not match.`)
        }

        // looks up user in database by email
        const user = await User.fetchUserByEmail(credentials.email)

        /* 
           if user is found, compare the password with the submitted password
           if they match, update database with given password and return user
           else, throw an error
        */
        if (user) {

            const isValid = await bcrypt.compare(credentials.password, user.password)

            // update database with given password
            if (isValid) {

                const newHashedPassword = await bcrypt.hash(credentials.newPassword, BCRYPT_WORK_FACTOR)

                const result = await db.query(`
                    UPDATE users 
                    SET password = $2
                        WHERE email = $1
                    RETURNING id, username, email, password, first_name, last_name;
                `,
                [credentials.email.toLowerCase(), newHashedPassword]
                )

                //return user
                return User.makePublicUser(result.rows[0])
            }
        }

        throw new UnauthorizedError("You're not authorized to update this user")
    }


    static async delete(credentials) {
        //required fields are email and password, throw error if either are missing
        const requiredFields = ["email", "password"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // looks up user in database by email
        const user = await User.fetchUserByEmail(credentials.email)

        /* 
           if user is found, compare the password with the submitted password
           if they match, delete user from database
           else, throw an error
        */
        if (user) {

            const isValid = await bcrypt.compare(credentials.password, user.password)

            // delete user from database
            if (isValid) {
                const result = await db.query(`
                    DELETE FROM users
                    WHERE email = $1;
                `,
                [credentials.email.toLowerCase()]
                )

                return {}
            }
        }

        throw new UnauthorizedError("You're not authorized to delete this user")
    }

    // gets user by email
    static async fetchUserByEmail(email) {

        if (!email) {
            throw new BadRequestError("No email provided")
        }

        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }

    // gets user by username
    static async fetchUserByUsername(username) {

        if (!username) {
            throw new BadRequestError("No username provided")
        }

        const result = await db.query(`SELECT * FROM users WHERE username = $1`, [username])

        const user = result.rows[0]

        return user
    }
}

module.exports = User
