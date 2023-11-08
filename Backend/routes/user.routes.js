import { Router } from "express";
import { logIn, signUp } from "../controllers/Auth.controller.js";

const router = Router()


router.route('/login').post(logIn)
router.route('/signup').post(signUp)



export default router