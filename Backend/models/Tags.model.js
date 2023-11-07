import mongoose from "mongoose";

const {Schema, model} = mongoose

const tagSchema = new Schema({

	name:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	course:{
		type:Schema.Types.ObjectId,
		ref:"Course"
	}

})

const Tag = model("tag",tagSchema)

export default Tag