import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.routes.js'

dotenv.config()

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use(urlencoded({extended:true}))

app.use('/ping',(req,res)=>{
	res.status(200).json({
		success:true,
		message:"Pong"
	})
})

app.use('/api/v1/user',userRoute)

app.all("*",(req,res)=>{
	res.send("404 not found")
})


export default app
