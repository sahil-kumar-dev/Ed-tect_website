import mongoose from "mongoose";

const {Schema,model} = mongoose

const profileSchema = new Schema ({
	gender:{
		type:String
	},
	dateOfBirth:{
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

const Profile = model("Profile",profileSchema)

export default Profile