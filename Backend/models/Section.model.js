import mongoose from "mongoose";

const {Schema, model} = mongoose

const sectionSchema = new Schema({
	sectionName:{
		type:String
	},
	subSection:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:"SubSection"
	}
})


const Section = model("section",sectionSchema)

export default Section