import mongoose from "mongoose";
import mainSender from "../utils/mailSender.js";

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

//a function to send mail

async function sendVerificationEmail(email,otp){
	try {
		const mailResponse = await mainSender(email,"Verification Email from StudyNotion",otp)
	} catch (error)  {
		console.log("error occured while send mail"+error);
	}
}


OtpSchema.pre("save",async (next)=>{
	await sendVerificationEmail(this.email,this.otp)
	next()
})
const OTP = model("otp",OtpSchema)

export default OTP