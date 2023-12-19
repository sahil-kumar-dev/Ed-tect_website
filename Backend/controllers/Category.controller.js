import Category from "../models/Category.model.js";

const createTag = (req, res) => {
	try {
		const { name, description } = req.body

		if (!name || !description) {
			return res.status(400).json({
				success: false,
				message: "All fields are requied."
			})
		}

		const catergoryDetails = Category.create({
			name,
			description
		})

		return res.status(200).json({
			success: true,
			message: "Tag created successfully."
		})

	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message
		})
	}
}

const showAlltags = async (req, res) => {
	try {
		const allTags = await Tag.find({}, { name: true, description: true })

		res.status(200).json({
			success: false,
			message: "Tags",
			allTags
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message
		})
	}
}

const categoryPageDetails = async (req, res) => {
	try {
		//get catergory 
		const { categoryId } = req.body
		//get courses for specified catergory

		const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec()
		//validation

		if (!selectedCategory) {
			return res.status(400).json({
				success: false,
				message: "Data not found."
			})
		}
		//get coursesfor different categories

		const differentCategories = await Category.find(
			{
				_id: { $ne: categoryId },
			}
		).populate("courses")
			.exec()
		//get top selling courses 

		//return response
		return res.status(200).json({
			success: true,
			data: {
				selectedCategory,
				differentCategories
			}
		})
	} catch (error) {
		return res.status(400).json({
			success:false,
			message:error.message
		})
	}
}