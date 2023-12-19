import { Router } from "express";
import { auth, isStudent } from "../middlewares/auth.middelware.js";
import { capturePayment, verifySignature } from "../controllers/Payments.controller.js";

const router = Router()

router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifySignature",verifySignature)



export default router