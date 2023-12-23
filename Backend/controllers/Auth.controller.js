import OTP from "../models/OTP.model.js";
import User from "../models/User.model.js";
import optGenerator from "otp-generator";
import bcrypt from "bcrypt";
import Profile from "../models/Profie.model.js";
import jwt from "jsonwebtoken";
//sendOtp

const sendOTP = async (req, res) => {
	try {
		const { email } = req.body;

		const verifyUser = await User.findOne({ email });

		//if user already exits,return

		if (verifyUser) {
			return res.status(400).json({
				success: false,
				message: "User already registered.",
			});
		}

		//generate otp

		const otp = optGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		
		//check unique otp or not
				
		const optBody = await OTP.create({
			email,
			otp,
		});

		console.log(typeof(email));

		optBody.save()
		//return response
		console.log("checkpoint");
		return res.status(200).json({
			success: true,
			message: "OTP sent successfully",
			otp,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

//signUp

const signUp = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;

		//Validation

		if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !contactNumber) {
			return res.status(400).json({
				success: false,
				message: "All fields are mandatory.",
			});
		}

		if (password != confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Password and confirm password didn't match.",
			});
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists.",
			});
		}

		//Find otp

		const findOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);

		//validate otp

		if (!findOtp) {
			return res.status(400).json({
				success: false,
				message: "Otp not found.",
			});
		}

		if(findOtp.otp != otp){
			return res.status(400).json({
				success: false,
				message: "Otp dosen't matched.",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const profileDetails = await Profile.create({
			gender: null,
			dataOfBirth: null,
			about: null,
			contactNumber: null,
		});

		const user = await User.create({
			firstName,
			lastName,
			email,
			accountType,
			contactNumber,
			password: hashedPassword,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
		});
		console.log(user);
		return res.status(200).json({
			success: true,
			message: "User registered successfully.",
			data:user,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
//logIn

const logIn = async (req, res) => {
	try {
		//get data from request body
		const { email, password } = req.body;

		//validate data
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required.",
			});
		}

		//check user exists or not
		const user = await User.findOne({ email }).populate("additionalDetails");

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Account dosen't exists please register first.",
			});
		}

		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				email: user.email,
				id: user._id,
				accountType: user.accountType,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
				expiresIn: "2h",
			});

			const options = {
				expiresIn:"3h"
			}

			user.token = token;
			user.password = undefined;

			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: "Logged in successfully",
			});
		} else {
			return res.status(400).json({
				success: false,
				message: "Incorrect password.",
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

//changePassword

const changePassword = async (req, res) => {
	const { password, confirmPassword } = req.body;

	if (!password || !confirmPassword) {
		return res.status(400).json({
			success: false,
			message: "All fields are mandatory.",
		});
	}

	if (password != confirmPassword) {
		return res.status(400).json({
			success: false,
			message: "Password and confirm password didn't match.",
		});
	}
};

export { sendOTP, signUp, logIn, changePassword };
