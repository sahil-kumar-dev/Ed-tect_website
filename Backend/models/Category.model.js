import mongoose from "mongoose";

const {Schema, model} = mongoose

const categorySchema = new Schema({

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

const Category = model("category",categorySchema)

export default Category