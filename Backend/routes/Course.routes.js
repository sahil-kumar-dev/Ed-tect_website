import { Router } from "express";
import { auth, isAdmin, isInstructor, isStudent } from "../middlewares/auth.middelware.js";
import { createRating, getAllRating, getAverageRating } from "../controllers/ratingAndReview.controller.js";
import { categoryPageDetails, createCategory, showAllCategory } from "../controllers/Category.controller.js";
import { createCourse, getCourseDetails } from "../controllers/Course.controller.js";
import { createSection } from "../controllers/Section.controller.js";
import { createSubSection } from "../controllers/SubSection.controller.js";

const router = Router()

//course

router.post("/createCourse",auth,isInstructor,createCourse)


//Category

router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllCategory)
router.post("/categoryPageDetails",categoryPageDetails)

//Section

router.post("/addSection",auth,isInstructor,createSection)
router.post("/getCourseDetails",getCourseDetails)

//SubSection

router.post("/addSubSection",createSubSection)

//Rating and review

router.post("/createRating",auth,isStudent,createRating)
router.post("/getAverageRating",getAverageRating)
router.post("/getReview",getAllRating)


export default router