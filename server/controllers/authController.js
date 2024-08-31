import { compare } from "bcrypt";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';



const maxAge = 5 * 24 * 60 * 60 * 1000; //5 days in milli second

const createToken = (email, userId) => { //email, userId = payload
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge })
}

export const signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password is required")
        }
        const user = await User.create({ email, password }); //User Creation
        res.cookie("jwt", createToken(email, user.id), { //This sets the JWT token as a cookie named jwt
            maxAge,
            secure: true, //Ensures the cookie is only sent over HTTPS
            sameSite: "none" // Allows the cookie to be sent in cross-site requests
        })
        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,

                profileSetup: user.profileSetup
            }
        })


    } catch (error) {
        console.log({ error });
        res.status(500).send("Internal Server Error", error.message)
    }
}

export const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password is required")
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found")
        }

        const auth = await compare(password, user.password);
        if (!auth) {
            return res.status(404).send("Incorrect password")
        }
        res.cookie("jwt", createToken(email, user.id), { //This sets the JWT token as a cookie named jwt
            maxAge,
            secure: true, //Ensures the cookie is only sent over HTTPS
            sameSite: "none" // Allows the cookie to be sent in cross-site requests
        })
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        })


    } catch (error) {
        console.log({ error });
        res.status(500).send("Internal Server Error", error.message)
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        const userId = req.userId;
        const userData = await User.findById(userId)

        if (!userData) {
            return res.status(404).send("User not found")
        }
        res.status(200).json({

            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,

        })

    } catch (error) {
        console.log({ error });
        res.status(500).send("Internal Server Error", error.message)
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { firstName, lastName, color } = req.body
        if (!firstName || !lastName || color !== undefined) {
            return res.status(400).send("First name, last name and color are needed for setting up the profile")
        }
        const userData = await User.findByIdAndUpdate(userId,
            { firstName, lastName, color, profileSetup: true },
            { new: true, runValidators: true }
        )

        res.status(200).json({

            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,

        })

    } catch (error) {
        console.log({ error });
        res.status(500).send("Internal Server Error", error.message)
    }
}