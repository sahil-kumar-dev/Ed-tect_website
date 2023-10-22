import mongoose, { trusted } from "mongoose";

const {Schema,model} = mongoose

const userSchema = new Schema({
	name:{
		type:String,
		required:[true,'Name is required'],
		trim:true
	},
	email:{
		type:String,
		required:true,
		trim:true
	},
	password:{
		type:String,
		required:true
	},
	accountType:{
		type:String,
		enum:["Admin","Student","Instructor"],
		required:true
	},
	additionalDetails:{
		type:mongoose.Schema.Types.ObjectId,
		required:true,
		ref:"Profile"
	},
	courses:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"course"
	},
	image:{
		type:String,
		required:true
	},
	courseProgress:[
		{
			type:Schema.Types.ObjectId,
			ref:"CourseProgress"
		}
	]
})

const User = model("user",userSchema)

export default User