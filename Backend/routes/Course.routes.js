import { Router } from "express";
import { auth, isAdmin, isStudent } from "../middlewares/auth.middelware.js";
import { createRating, getAllRating, getAverageRating } from "../controllers/ratingAndReview.controller.js";
import { createCategory } from "../controllers/Category.controller.js";

const router = Router()

//Category

router.post("/createCategory",auth,isAdmin,createCategory)


//Rating and review

router.post("/createRating",auth,isStudent,createRating)
router.post("/getAverageRating",getAverageRating)
router.post("/getReview",getAllRating)


export default router