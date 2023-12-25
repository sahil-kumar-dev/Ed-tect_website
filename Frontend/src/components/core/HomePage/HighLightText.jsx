import React from 'react'

function HighLightText({text}) {
  return (
	<span className='highlighted-text font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent'>{text}</span>
  )
}

export default HighLightText