import SubSection from '../models/SubSection.model.js'
import Section from '../models/Section.model.js'
import uploadImageToCloudinary from '../utils/imageUploader.util.js'

exports.createSubSection = async (req, res) => {
	try {

		//fetch data

		const { sectionId, title, description, timeDuration } = req.body
		//extract file

		const video = req.files.videoFile

		//validation

		if (!sectionId || !title || !timeDuration || !description || !video) {
			return res.status(400).json({
				success: false,
				message: "All fields are required."
			})
		}
		//upload to cloudinary

		const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

		//create a sub section

		const subSectionDetails = await SubSection.create({
			title,
			timeDuration,
			description,
			videoUrl: uploadDetails.secure_url
		})

		//update section with this sub section 

		const updateSection = await Section.findByIdAndUpdate(
			{
				_id: sectionId
			},
			{
				$push: {
					subSection: subSectionDetails._id
				}
			},
			{ new: true })

		//return response
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

//update subsection 

//delete subsection
