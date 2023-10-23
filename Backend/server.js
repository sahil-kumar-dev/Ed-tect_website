import app from "./app.js";
import connectionToDB from "./config/dbConfig.js";


connectionToDB()

app.listen(process.env.PORT,()=>{
	console.log("App is listining on http://localhost:",process.env.PORT);
})