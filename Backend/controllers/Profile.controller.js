import Profile from "../models/Profie.model.js";
import User from "../models/User.model.js";

exports.updateProfile = async (req, res) => {
	try {
		//get data

		const { dataOfBirth = "", about = "", contactNumber, gender } = req.body
		//get userId

		const id = req.user.id
		//validation

		if (!contactNumber || !gender) {
			return res.status(400).json({
				success: false,
				message: "All fields are required."
			})
		}
		//find profile

		const userDetails = await User.findById("id")

		const profileId = userDetails.additionalDetails

		const profileDetails = Profile.findById(profileId)
		//update profile	

		profileDetails.dataOfBirth = dataOfBirth
		profileDetails.about = about
		profileDetails.contactNumber = contactNumber
		profileDetails.gender = gender

		await profileDetails.save()


		//return response

		return res.status(200).json({
			message: true,
			message: "Profile updated successfully",
			profileDetails
		})

	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

//delete account

exports.deleteAccount = async (req, res) => {
	try {
		//fetch account id

		const { id } = req.user.id

		//validate id
		const userDetails = await User.findById(id)

		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: "User not found."
			})
		}

		//delete profile

		await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails })

		//delete user
		await User.findByIdAndDelete({ _id: id })

		//return response
		return res.status(200).json({
			message: true,
			message: "Account deleted successfully"
		})
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id
		const userDetails = await User.findById(id).populate("additionalDetails").exec()

		return res.status(200).json({
			success: true,
			message: "User details fetched successfully."
		})

	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}