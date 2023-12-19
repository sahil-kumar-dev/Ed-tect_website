import mongoose from "mongoose";

const {Schema, model} = mongoose

const CourseSchema = new Schema({
	courseName:{
		type:String,
		trim:true
	},
	courseDescription:{
		type:String,
		trime:true,
		required:true
	},
	instructor:{
		type:Schema.Types.ObjectId,
		ref:"User",
		required:true
	},
	whatWillYourLearn:{
		type:String
	},
	courseContent:[
		{
			type:Schema.Types.ObjectId,
			ref:"Section"
		}
	],
	ratingAndReviews:[
		{
			type:Schema.Types.ObjectId,
			ref:"RatingAndReview"
		}
	],
	price:{
		type:Number
	},
	thumbnail:{
		type:String
	},
	category:{
		type:Schema.Types.ObjectId,
		ref:"category"
	},
	studentsEnrolled:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:"User"
	}
})

const Course = model("course",CourseSchema)

export default Course