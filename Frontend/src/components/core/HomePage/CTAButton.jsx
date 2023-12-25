import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({children,active,linkto,shadow=true}) {
  return (
    <Link to={linkto}>
      <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active?"bg-[#FFD60A] text-black":"bg-richblack-800"} hover:scale-95 hover:shadow-none transition-all duration-200 ${shadow?'shadow-[3px_3px_0px_0px_rgba(46,46,46,1)]':''}`}>
        {children}
      </div>
    </Link>
  )
}

export default CTAButton