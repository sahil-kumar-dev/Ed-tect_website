const sendOtpTemplate = (otp) => {
	return `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap" rel="stylesheet">
	<title>Verification Email</title>
	<style>
	body {
		text-align: center;
		font-family: 'Roboto';
	}
	.container {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		text-align:center;
		color:black;
		height:100%;
	}
	
	h2 {
		background-color: #ffdc18;
		display: inline-block;
		padding: 5px 10px;
		border-radius: 10px;
		color:black;
	}

	h4{
		color:black;
	}
	
	p {
		color:black;
		font-size: 0.7rem;
		font-weight: 600;
	}
	
	footer p {
		color: #898989;
		font-weight: 400;
	}
	
	footer span {
		color: rgb(3, 3, 255);
		text-decoration: underline;
	}
	</style>
</head>
<body>
	<div class="container">
		<h2>Learn Code Online</h2>
		<h4>OTP Verification Email</h4>
		<p>Thank you for registering with StudyNotion. To complete your registration, please <br> use the following OTP
			&lpar;One-Time-Password&rpar; to verify your account.</p>
		<div class="otp">
			<h1>${otp}</h1>
		</div>
		<p>This OTP is valid for 5 minutes. If you did not request this verification, please <br>
			disregard this email. Once your account is verified, you will have access to our <br>
			platform and its features.
		</p>
		<footer>
			<p>If you have any questions or need assistance, please feel free to reach out us at
				<br><a href="mailto:info@studynotion.com">info@studynotion.com</a>. We will happy to help you.
			</p>
		</footer>
	</div>
</body>

</html>
`}

export default sendOtpTemplate