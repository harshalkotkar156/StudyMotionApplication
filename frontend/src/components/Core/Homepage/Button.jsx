import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active,linkto, borderOn}) => {
  return (
    <Link to={linkto}>
        
        <div className={`text-center text-[15px] px-6 py-3 rounded-md  hover:border-0 font-bold  ${active  ? "bg-[#FED608] text-black" : "bg-[#161D29]"} hover:scale-95 transition-all duration-200 ${borderOn ? "border-b-2 border-r-2 border-[#2E343E]" : "" }`}>
            {children}
        </div>
    
    </Link>
  )
}

export default Button