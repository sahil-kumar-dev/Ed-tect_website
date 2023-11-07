import mongoose from "mongoose";

const {Schema, model} = mongoose

const ratingAndReviewSchema = new Schema({
	user:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:"User"
	},
	rating:{
		type:Number,
		required:true
	},
	review:{
		type:String,
		required:true
	}
})

const RatingAndReview = model("RatingAndReview",ratingAndReviewSchema)

export default RatingAndReview