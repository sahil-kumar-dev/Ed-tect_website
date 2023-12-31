import Course from "../models/Course.model.js";
import Category from "../models/Category.model.js";
import User from "../models/User.model.js";
import uploadImageToCloudinary from "../utils/imageUploader.util.js";

const createCourse = async (req, res) => {
	try {
		//fetch data
		const { courseName, courseDescription, whatYouWillLearn, price, category, tag } = req.body;
		//get thumbnail

		const thumbnail = req.files.thumbnailImage;
		//validation

		if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category) {
			return res.status(403).json({
				success: false,
				message: "All fields are required.",
			});
		}

		//check for instructor

		const userId = req.user.id;

		const instructorDetails = await User.findById(userId);

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor details not found",
			});
		}

		//check given tag is valid or not

		const categoryDetails = await Category.findById(category);

		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category details not found",
			});
		}

		//Upload image to cloudinary

		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);

		//create an entry for new course

		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn,
			tag,
			category,
			price,
			tag,
			thumbnail: thumbnailImage.secure_url,
		});

		//add the new course to the user schema of instructor id

		await User.findByIdAndUpdate(
			{ _id: instructorDetails._id },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		//return response

		return res.status(200).json({
			success: false,
			message: "Course created successfully.",
			data: newCourse,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

const getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnrolled: true,
			}
		)
			.populate("instrutor")
			.exec();

		return res.status(200).json({
			success: true,
			message: "Data fetched successfully.",
			data: allCourses
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

const getCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.body

		//find course details

		const courseDetails = await Course.find(
			{ _id: courseId })
			.populate(
				{
					path: "instructor",
					populate: { path: "additionalDetails" }
				}
			)
			.populate("category")
			// .populate("ratingAndreview")
			.populate(
				{
					path: "courseContent", 
					// populate: {
					// 	path: "subSection"
					// }
				}
			).exec()

		if (!courseDetails) {
			return res.status(300).json({
				success: false,
				message: "Could not find the course "
			})
		}

		return res.status(200).json({
			success: true,
			message: "Course details fetched successfully.",
			courseDetails
		})


	} catch (error) {
		console.log(error)
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

export { createCourse, getAllCourses, getCourseDetails };
