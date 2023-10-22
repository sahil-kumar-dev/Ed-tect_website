import mongoose from 'mongoose'
const { connect } = mongoose

const connection = () => {
	connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
		.then(() => {
			console.log("Connection to db successful");
		}).catch(err => {
			console.log(err.message);
			process.exit(1)
		})
}

export default connection