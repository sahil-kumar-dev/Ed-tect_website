import jwt from 'jsonwebtoken'

//auth

const auth = async (req,res,next) =>{
	try {
		//extract token
		const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer"," ")

		if(!token){
			return res.status(400).json({
				success:false,
				message:"Token is missing"
			})
		}

		try {
			const decode = jwt.verify(token,process.env.JWT_SECRET)
			req.user = decode
		} catch (error) {
			return res.status(401).json({
				success:false,
				message:'Session expired,Please login again.'
			})
		}
		
		next()
	} catch (error) {
		return res.status(401).json({
			success:false,
			message:'Something went wrong.'
		})
	}
}


//isStudent

const isStudent = async (req,res,next) =>{

	try {
		
		if(req.user.accountType != 'Student'){
			return res.status(400).json({
				success:false,
				message:"This is a protect route for student only."
			})
		}

	} catch (error) {
		return res.status(400).json({
			success:false,
			message:error.message
		})
	}
	next()
}

//isInstructor

const isInstructor = async (req,res,next) =>{

	try {
		if(req.user.accountType != 'Instructor'){
			return res.status(400).json({
				success:false,
				message:"This is a protect route for instructor only."
			})
		}

	} catch (error) {
		return res.status(400).json({
			success:false,
			message:error.message
		})
	}
	next()
}

//isAdmin

const isAdmin = async (req,res,next) =>{

	try {
		const accountType = req.user
		console.log(accountType);
		if(req.user.accountType != 'Admin'){
			return res.status(400).json({
				success:false,
				message:"This is a protect route for admin only."
			})
		}

	} catch (error) {
		return res.status(400).json({
			success:false,
			message:error.message
		})
	}
	next()
}

export {
	auth,
	isStudent,
	isInstructor,
	isAdmin
}