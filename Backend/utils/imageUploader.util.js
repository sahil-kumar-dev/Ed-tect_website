import cloudinary from 'cloudinary'

const uploadImageToCloudinary = async (file,folder,height,quality) =>{
	const options ={
		folder,
		resourse_type:"auto"
	}
	
	if(height){
		options.height = height
	}
	if(quality){
		options.quality = quality
	}
	// options.resourse_type = "auto"

	return await cloudinary.v2.uploader.upload(file.tempFilePath,options)
}

export default uploadImageToCloudinary