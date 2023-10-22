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
			tyep:Schema.Types.ObjectId,
			ref:"Section"
		}
	],
	ratingAndReviews:[
		{
			tyep:Schema.Types.ObjectId,
			ref:"RatingAndReview"
		}
	],
	price:{
		type:Number
	},
	thumbnail:{
		type:String
	},
	tag:{
		type:Schema.Types.ObjectId,
		ref:"Tag"
	},
	studentsEnrolled:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:"User"
	}
})

const Course = model("course",CourseSchema)

export default Course