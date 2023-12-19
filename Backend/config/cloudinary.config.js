import cloudinary from 'cloudinary'

const connectToCloudinary = () => {
	try {
		cloudinary.v2.config({
			cloud_name:process.env.CLOUDINARY_NAME,
			api_key:process.env.CLOUDINARY_API_KEY,
			api_secret:process.env.CLOUDINARY_API_SECRET
		})
	} catch (error) {
		console.log(error.message);
	}
}

export default connectToCloudinary