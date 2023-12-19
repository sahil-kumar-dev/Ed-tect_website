import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/User.routes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import paymentRoutes from './routes/Payments.routes.js'
import courseRoute from './routes/Course.routes.js'
import profileRoute from './routes/Profile.routes.js'

dotenv.config()

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use(urlencoded({extended:true}))

app.use(cors({
	origin:"http://localhost:3000",
	credentials:true
}))

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp"
	})
)

app.use('/api/v1/auth',userRoute)
app.use('/api/v1/profile',profileRoute)
app.use('/api/v1/course',courseRoute)
app.use('/api/v1/payment',paymentRoutes)

app.use('/ping',(req,res)=>{
	res.status(200).json({
		success:true,
		message:"Pong"
	})
})



app.all("*",(req,res)=>{
	res.send("404 not found")
})


export default app
