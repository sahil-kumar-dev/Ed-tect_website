import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighLightText from '../components/core/HomePage/HighLightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'

function Home() {
	return (
		<div>
			{/* Section 1  */}
			<div className="relative mx-auto max-w-max flex flex-col w-11/12 items-center text-white justify-between">
				<Link to={"/signup"}>
					<div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ">
						<div className="flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
							<p>Become an Instructor</p>
							<FaArrowRight />
						</div>
					</div>
				</Link>

				<div className="text-center text-4xl font-semibold mt-6">
					Empower Your Future Growth with <HighLightText text={"Coding Skills"} />
				</div>

				<div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
					With our online coding courses, you can learn at your own pace, from anywhere in the world, and get acces to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
				</div>

				<div className="flex gap-7 mt-8">
					<CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
					<CTAButton linkto={"/login"}>Book a demo</CTAButton>
				</div>

				<div className="shodow-blue-200 mx-3 my-12 ">
					<video muted loop autoPlay>
						<source src='' />
					</video>
				</div>

				{/* Code Section 1  */}

				<div className="w-10/12 font-[Inter]">
					<CodeBlocks
						position={"lg:flex-row"}
						codecolor={"yellow"}
						heading={<div>Unlock Your <HighLightText text={"Coding potential"} /> with our online courses.</div>}
						subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
						ctabtn1={[
							"Try it your self",
							"/signup",
							true
						]}
						ctabtn2={[
							"learn more",
							"/login",
							false
						]}
						codeblock={`<!Doctype html>\n <html> \n <head> \n <title>Example</title> \n </head> \n <body> \n <h1> <a href="/">Header</a></h1> \n <nav> <a href="one/">One</a> \n <a href="two">Two</a> </nav>\n</body> \n </html>`}
					/>
				</div>
				{/* Code Section 2  */}
				<div className="w-10/12 font-inter">
					<CodeBlocks
						position={"lg:flex-row-reverse"}
						heading={<div>Start <HighLightText text={"Coding in seconds"} /></div>}
						subheading={"Go ahead, give it a try. Our hands-on learing environment means you'll be writing real code from your very first lesson."}
						ctabtn1={[
							"Continue lesson",
							"/signup",
							true
						]}
						ctabtn2={[
							"learn more",
							"/login",
							false
						]}
						codeblock={`import React from 'react';\n import {FaArrowRight} from 'react-icons'\n import CTAButton from '../components'\n  \n function HomePage(){ \n return {\n <div>Home Page </div> \n <h1>This is a homepage.</h1> \n <a href="/login">Log In </a>}\n		} \n export default Home;`}
					/>
				</div>
			</div>
			{/* Section 2  */}
			<div className="bg-white text-rich-black-700">
				<div className="homepage-bg h-96">
					<div className="w-11/12 max-w-max flex items-center gap-5 mx-auto">
						<div className="flex gap-8 text-white">
							<CTAButton active={true} linkto={"/signup"} shadow={false}>
								<div className="flex gap-2 items-center">
									<p>Explore full Catalog</p>
									<FaArrowRight />
								</div>
							</CTAButton>
							<CTAButton active={false} linkto={"/login"} shadow={false} >
								<p>Learn More</p>
							</CTAButton>
						</div>
					</div>
				</div>
			</div>
			{/* Section 3  */}

		</div>
	)
}

export default Home