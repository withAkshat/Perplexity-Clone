
import {Router} from "express"
import { register, verify,login } from "../controllers/auth.controllers.js"
import { loginValidator, registerValidator } from "../validator/auth.validator.js"

const authRouter = Router()

authRouter.post("/register", registerValidator ,register)
authRouter.post("/login", loginValidator ,login)
authRouter.get("/verify-email", verify)

export default authRouter