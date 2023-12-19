import mongoose from "mongoose";

const { Schema, model } = mongoose

const userSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		trim: true
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is required'],
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	accountType: {
		type: String,
		enum: ["Admin", "Student", "Instructor"],
		required: true
	},
	additionalDetails: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Profile"
	},
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: "course"
		}
	],
	image: {
		type: String,
		required: true
	},
	courseProgress: [
		{
			type: Schema.Types.ObjectId,
			ref: "CourseProgress"
		}
	],
	token:{
		type:String
	},
	resetPasswordExpires:{
		type:String,
		default:Date.now()
	}
})

const User = model("user", userSchema)

export default User