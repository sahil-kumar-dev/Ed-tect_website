import Tag from "../models/Tags.js";


const createTag =(req,res) =>{
	try {
		const {name,description} = req.body

		if(!name || !description){
			return res.status(400).json({
				success:false,
				message:"All fields are requied."
			})
		}

		const tagDetails = Tag.create({
			name,
			description
		})

		return res.status(200).json({
			success:true,
			message:"Tag created successfully."
		})

	} catch (error) {
		res.status(500).json({
			success:false,
			message:error.message
		})
	}
}

const showAlltags = async (req,res) =>{
	try {
		const allTags = await Tag.find({},{name:true,description:true})

		res.status(200).json({
			success:false,
			message:"Tags",
			allTags
		})
	} catch (error) {
		res.status(500).json({
			success:false,
			message:error.message
		})
	}
}