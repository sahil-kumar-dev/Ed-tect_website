import { instance } from '../config/razorpay.config.js'
import Course from '../models/Course.model.js'
import User from '../models/User.model.js'
import mailSender from '../utils/mailSender.util.js'
import { Mongoose } from 'mongoose'
//Todo: make email template to send course purchase email

exports.capturePayment = async (req, res) => {
	//get courseId and user Id
	const { course_id } = req.body
	const { user_id } = req.user.id
	//validation
	if (!course_id) {
		return res.json({
			success: false,
			message: "Please provide valid course Id"
		})
	}
	//valid courseId
	let course = await Course.findById(course_id)
	if (!course) {
		return res.status(400).json({
			success: false,
			message: "Course not found"
		})
	}
	//valid coursedetails

	//user have already enrolled or not
	const uid = new Mongoose.Types.ObjectId(user_id)
	if (course.studentsEnrolled.includes(uid)) {
		return res.status(300).json({
			success: false,
			message: "Student is already enrolled."
		})
	}
	//create order
	const amount = course.price
	const currency = "INR"

	const options = {
		amount: amount * 100,
		currency,
		receipt: Math.random(Date.now()).toString(),
		notes: {
			courseId: course_id,
			user_id
		}
	}

	try {
		//initiate the payment using razorpay
		const paymentResponse = await instance.orders.create(options)
		console.log(paymentResponse);
		return res.status(200).json({
			success: true,
			courseName: course.courseName,
			courseDescription: course.courseDescription,
			thumbnail: course.thumbnail,
			orderId: paymentResponse.id,
			currency: paymentResponse.currency,
			amount: paymentResponse.amount
		})
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: "Can't create order", error
		})
	}
	//return response
}


//verify signature

exports.verifySignature = async (req, res) => {
	const webhookSecret = "12345678"
	const signature = req.headers["x-razorpay-signature"]

	const shasum = crypto.createHmac("sha256", webhookSecret)

	shasum.update(JSON.stringify(req.body))

	const digest = shasum.digest("hex")

	if (signature === digest) {
		console.log("Payment is authourised.");

		const { courseId, userId } = req.body.payload.payment.entity.notes

		try {
			//fulfill the action

			//find the course and enroll the student in it
			const enrolledCourse = await Course.findOneAndUpdate(
				{ _id: courseId },
				{ $push: { studentsEnrolled: userId } },
				{ new: true }
			)

			if (!enrolledCourse) {
				return res.status(500).json({
					success: false,
					message: "Course not found"
				})
			}

			//find the student and add the course list of enrolled courses

			const enrolledStudent = await User.findOneAndUpdate(
				{ _id: userId },
				{ $push: { courses: courseId } },
				{ new: true }
			)

			console.log(enrolledStudent);

			//send confirmation mail

			const emailResponse = await mailSender(
				enrolledStudent.email,
				"Congratulation from codehelp",
				"Thanks for purchasing the course"
			)

			console.log(emailResponse);
		} catch (error) {
			return res.status(400).json({
				success: false,
				message: error.message
			})
		}
	}else{
		return res.status(400).json({
			success:false,
			message:"Invalid Response"
		})
	}

}