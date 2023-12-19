import { Router } from "express";
import { logIn, sendOTP, signUp } from "../controllers/Auth.controller.js";
import { resetPassword, resetPasswordToken } from "../controllers/ResetPassword.controller.js";

const router = Router()


router.route('/login').post(logIn)
router.route('/signup').post(signUp)
router.route('/sendotp').post(sendOTP)
router.route('/reset-password-token').post(resetPasswordToken)
router.route('/reset-password/:token').post(resetPassword)

export default router