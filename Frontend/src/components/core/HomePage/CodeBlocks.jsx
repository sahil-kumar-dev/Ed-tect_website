import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from './CTAButton'
import { TypeAnimation } from 'react-type-animation'
function CodeBlocks({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, bggradient, codecolor }) {
	return (
		<div className={`flex ${position} my-20 justify-between gap-10 w-full`}>
			{/* Section 1  */}
			<div className="w-1/2 flex flex-col gap-8 px-10">
			 	<h1 className="text-3xl font-bold">{heading}</h1>
				<p className='text-richblack-300 font-bold'>
					{subheading}
				</p>
				<div className="flex gap-7 mt-7">
					<CTAButton active={ctabtn1[2]} linkto={ctabtn1[1]}>
						<div className="flex gap-2 items-center">
							{ctabtn1[0]}
							<FaArrowRight/>
						</div>
					</CTAButton>
					<CTAButton active={ctabtn2[2]} linkto={ctabtn2[1]}>
						<div className="flex gap-2 items-center">
							{ctabtn2[0]}
						</div>
					</CTAButton>
				</div>
			</div>
			<div className="relative h-fit flex flex-row text-[10px] w-2/5 bg-[rgba(255,255,255,0.1)] gap-2 text-lg p-2 shadow-[-4px_-4px_6px_0px_rgba(255,255,255,0.46)]">
				<div className="text-center flex flex-col w[10%] text-richblack-200 font-inter font-bold">
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>5</p>
					<p>6</p>
					<p>7</p>
					<p>8</p>
					<p>9</p>
					<p>10</p>
					<p>11</p>
				</div>
				<div className={`w-[90%] flex flex-col gap-2 font-semibold font-mono pr-2 `}>
					<TypeAnimation
						sequence={[codeblock, 5000, " "]}
						repeat={Infinity}
						cursor={true}
						wrapper='div'
						style={
							{
								whiteSpace: "pre-line",
								display: "block",
								color: `${codecolor}`,
								fontFamily: "Inter",
								letterSpacing: "1px"
							}
						}
						omitDeletionAnimation={true}
						speed={30}
					/>
				</div>
			</div>
		</div>
	)
}

export default CodeBlocks