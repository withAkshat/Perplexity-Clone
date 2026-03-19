
import { Router } from "express"
import { register, verify,login, getMe } from "../controllers/auth.controller.js"
import { registerValidator } from "../validator/auth.validator.js"
import { verifyUser } from "../middlewares/auth.middleware.js"

const authRouter = Router()

authRouter.post("/register", registerValidator ,register)
authRouter.post("/login", login)
authRouter.get("/verify-email", verify)
authRouter.get("/get-me", verifyUser, getMe)

export default authRouter