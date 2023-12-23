import { Router } from "express";
import { auth } from "../middlewares/auth.middelware.js";
import {deleteAccount, getAllUserDetails, updatePicture, updateProfile} from '../controllers/Profile.controller.js'

const router = Router()

router.delete("/deleteProfile",auth,deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.put("/updateDisplayPicture",auth,updatePicture)
router.get("/getUserDetails",auth,getAllUserDetails)

// router.get("getEnrolledCourses",auth,getEnrolledCourses)
// router.put("updateDisplayPicture",auth,updateDispalyPictures)

export default router