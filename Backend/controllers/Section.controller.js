import Section from '../models/Section.model.js'
import Course from '../models/Course.model.js'

const createSection = async (req, res) => {
	try {
		//fetch data

		const { sectionName, courseId } = req.body;

		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing properties"
			})
		}

		const newSection = await Section.create({ sectionName });

		const updateCourseDetails = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id
				}
			},
			{ new: true }
		)

		return res.status(200).json({
			success: true,
			message: "Section created succesfully.",
			updateCourseDetails
		})
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

const updateSection = async (req,res) =>{
	try {
		//data input

		const {sectionName,sectionId} = req.body

		//data validation
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing properties"
			})
		}

		//find and update data

		const section = await Section.findByIdAndUpdate(
			sectionId,
			{sectionName},
			{new:true}
		)

		//return response

		return res.status(200).json({
			success: false,
			message: "Section updated succesfully.",
			section
		})
		
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

const deleteSection = async(req,res) => {
	try {
		
		//getId

		const {sectionId} = req.params

		//find and delete

		await Section.findByIdAndDelete(sectionId)

		//Todo: delete the entry from the course schema

		//send response

		return res.status(200).json({
			success: false,
			message: "Section deleted succesfully.",
			section
		})
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

export {
	createSection,
	updateSection,
	deleteSection
}