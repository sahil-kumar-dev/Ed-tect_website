import app from "./app.js";
import connectToCloudinary from "./config/cloudinary.config.js";
import connectionToDB from "./config/db.config.js";


connectionToDB()
connectToCloudinary()

app.listen(process.env.PORT,()=>{
	console.log("App is listining on http://localhost:",process.env.PORT);
})