import mongoose from "mongoose";

const {Schema, model} = mongoose

const SubSectionSchema = new Schema({
	title:{
		type:String
	},
	timeDuration:{
		type:String
	},
	description:{
		type:String
	},
	videoUrl:{
		type:String
	}
})


const subSection = model("courseProgress",SubSectionSchema)

export default subSection