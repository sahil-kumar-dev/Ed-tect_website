import RatingAndReview from "../models/RatingAndReview.model.js";
import Course from "../models/Course.model.js";
import { Mongoose } from "mongoose";

//create rating 
const createRating = async (req, res) => {
	try {
		//get user id
		const userId = req.user.id

		//get data from request body
		const { rating, review, courseId } = req.body

		//check if user is enrolled or not
		const courseDetails = await Course.findOne(
			{
				_id: courseId,
				studentsEnrolled: { $eleMatch: { $eq: userId } }
			}
		)

		if (!courseDetails) {
			return res.status(404).json({
				success: false,
				message: "Student is not enrolled in the course."
			})
		}

		//check if user had alread reviewed the course
		const alreadyReviwed = await RatingAndReview.findOne(
			{
				user: userId,
				course: courseId
			}
		)

		if (alreadyReviwed) {
			return res.status(403).json({
				success: false,
				message: "Course is already reviewed by the user."
			})
		}

		//create rating and review
		const ratingReview = await RatingAndReview.create({
			rating,
			review,
			course: courseId,
			user: userId
		})

		//update course with this rating and review
		await Course.findByIdAndUpdate(courseId,
			{
				$push: {
					ratingAndReviews: ratingReview._id
				}
			},
			{ new: true }
		)

		//return the response
		return res.status(200).json({
			success: true,
			message: "Rating and review updated successfully.",
			ratingReview
		})
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}
//getAverateRating

const getAverageRating = async (req, res) => {
	try {
		//get course ID
		const courseId = req.body.courseId

		//calculate average rating
		const result = await RatingAndReview.aggregate(
			[
				{
					$match: {
						course: new Mongoose.Types.ObjectId(courseId)
					}
				},
				{
					$group: {
						_id: null,
						averageRating: { $avg: "$rating" }
					}
				}
			]
		)
		//return rating
		if (result.length > 0) {
			return res.status(200).json({
				success: true,
				message: result[0]
			})
		}

		return res.status(200).json({
			success: true,
			message: "Average rating 0",
			averageRating: 0
		})
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

//getAllRating
const getAllRating = async (req,res) => {
	try {
		const allReviews = await RatingAndReview.find()
		.sort({rating:"desc"})
		.populate({
			path:"user",
			select:"firstName lastName email image"
		})
		.populate({
			path:"Course",
			select:"courseName"
		})

		return res.status(200).json({
			success:true,
			message:"All reviews fetched successfully.",
			data:allReviews 
		})
	} catch (error) {
		
	}
}

export {
	getAllRating,
	createRating,
	getAverageRating
}