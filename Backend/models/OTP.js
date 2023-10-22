import mongoose from "mongoose";

const {Schema, model} = mongoose

const OtpSchema = new Schema({

	email:{
		type:String,
		required:true
	},
	otp:{
			type:String,
			required:true
	},
	createdAt:{
		type:Date,
		default:Date.now(),
		expires:5*60
	}

})

const OTP = model("otp",OtpSchema)

export default OTP