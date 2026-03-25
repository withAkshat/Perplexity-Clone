import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt, { decode } from "jsonwebtoken"

export async function register(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user with this email or username already exists!",
            success: false,
            error: "User already exists!"
        })
    }


    const user = await userModel.create({
        username,
        email,
        password 
    })



    const emailVerificationToken = jwt.sign(
        { email },
        process.env.JWT_SECRET
    )

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity",
        html:
            `
            <p>Hi ${username},</p>
            <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="http://localhost:8000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    res.status(201).json({
        message: "User registered sucessfully!",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */
export async function verify(req, res) {

    const { token } = req.query;

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.send("Invalid User!")
        }
        

        const { email } = decoded

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "User not found"
            })
        }

        if (user.verified) {
            const html =
            `
            <h1>Email Already Verfied!</h1>
            <p>You can log in to your account.</p>
            <a href="http://localhost:8000/login">Go to Login</a>
            `

            return res.send(html)
        }

        user.verified = "true"

        await user.save();

        const html =
            `
            <h1>Email Verified Successfully!</h1>
            <p>Your email has been verified. You can now log in to your account.</p>
            <a href="http://localhost:8000/api/auth/login">Go to Login</a>
        `

        res.send(html)

    } catch (e) {
        return res.status(400).json({
            message: "Invalid or expired token",
            sucess: false,
            err: e.message
        })
    }
}


/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 */

export async function login(req, res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {

        return res.status(400).json({

            message: "User doesn't exist",
            success: false,
            err: "Invalid credentials"
        })
    }


    const isPassTrue = await user.comparePassword(password);

    if (!isPassTrue) {

        return res.status(401).json({
            message: "Invalid credentials",
            success: false,
            err: "Incorrect password"
        })
    }

    if (!user.verified) {
        return res.status(400).json({
            message: "Please verify your email before logging in",
            success: false,
            err: "Email not verified"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: "2d" })

    res.status(200).cookie("token", token).json({
        message: "User logined",
        sucess: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @desc Get current logged in user's details
 * @route GET /api/auth/get-me
 * @access Private
 */
export async function getMe(req, res) {

    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
        return res.status(401).json({
            message: "User not found",
            sucess: false,
            err: "User not found"
        })
    }

    res.status(200).json({
        message: "User details fetched sucessfully!",
        success: true,
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }
    })


}