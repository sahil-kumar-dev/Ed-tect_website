import mongoose from "mongoose";

const {Schema,model} = mongoose

const profileSchema = new Schema ({
	gender:{
		type:String
	},
	dataOfBirth:{
		type:String
	},
	about:{
		type:String,
		trim:true
	},
	contactNumber:{
		type:Number,
		trim:true
	}
})

const Profile = model("profile",profileSchema)

export default Profile