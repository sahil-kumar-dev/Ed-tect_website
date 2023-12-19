import mailSender from "../utils/mailSender.util.js";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const resetPasswordToken = async (req, res) => {
	try {
		const { email } = req.body

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Email not registered."
			})
		}

		const token = crypto.randomUUID()

		const updatedDetais = await User.findOneAndUpdate({ email }, {
			token: token,
			resetPasswordExpires: Date.now() + 5 * 60 * 1000
		},
			{ new: true })

		const url = `http://localhost:5500/update-password/${token}`

		await mailSender(email, "Password reset link", `password reset link ${url}`)

		return res.status(200).json({
			success: true,
			message: "Reset link successfully send to email."
		})

	} catch (error) {
		return res.status(400).json({
			success: false,
			messsage: error.message
		})
	}

}


const resetPassword = async (req, res, next) => {

	//data fetch
	const { token } = req.params
	const { password, confirmPassword } = req.body

	if (!password || !confirmPassword) {
		return res.status(402).json({
			success: false,
			message: "All fields are mandatory"
		})
	}

	if (password != confirmPassword) {
		return res.status(402).json({
			success: false,
			message: "Password and confirm password didn't match."
		})
	}

	const user = await User.findOne({ token })

	if (!user) {
		return res.status(402).json({
			success: false,
			message: "Invalid token."
		})
	}

	if (user.resetPasswordExpires < Date.now()) {
		return res.status(402).json({
			success: false,
			message: "Token expired"
		})
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	await User.findOneAndUpdate(
		{ token: token },
		{ password: hashedPassword },
		{ new: true }
	)

	return res.status(200).json({
		success: true,
		message: "Passoword reset successful."
	})
}

export {
	resetPassword,
	resetPasswordToken
}