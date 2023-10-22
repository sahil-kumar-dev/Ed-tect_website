import mongoose from "mongoose";

const {Schema, model} = mongoose

const courseProgressSchema = new Schema({
	courseID:{
		type:Schema.Types.ObjectId,
		ref:"Course"
	},
	completedVideos:{
		type:Schema.Types.ObjectId,
		ref:"SubSection"
	}
})

const CourseProgress = model("courseProgress",courseProgressSchema)

export default CourseProgress