import Razorpay from "razorpay";

const instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY || "rzp_test_NGgrDTh7cW02Nb",
	key_secret: process.env.RAZORPAY_SECRET || "yX5bnJAVptaDhjWqsRBPTjJL"
})

export default instance