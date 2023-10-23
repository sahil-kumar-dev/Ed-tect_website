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


	} catch (error) {
		
	}
}