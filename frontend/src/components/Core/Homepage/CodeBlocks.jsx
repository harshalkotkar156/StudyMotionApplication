import React from 'react'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from './HighlightText'
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({position,heading,subHeading,buttonContent1,buttonContent2,bgGradient,codeBlock,codeColor,backgroundGradient,borderOn}) => {
  return (


    <div className={`flex ${position} my-20 justify-between gap-10 `}>

        <div className='w-[50%] flex flex-col gap-8'>
            {heading}

            {/* this is for the subHeading section */}
    
            <div className='font-bold text-[#838894]'>
                {subHeading}
            </div>

            <div className='flex flex-row gap-7 mt-7'>
                
            <CTAButton active={buttonContent1.active} linkto={buttonContent1.linkto} borderOn={true}>
                    <div className='flex gap-2 items-center'>
                        {buttonContent1.btnText}
                         <FaArrowRight />
                    </div>
            </CTAButton>  

            
            <CTAButton active={buttonContent2.active} linkto={buttonContent2.linkto} borderOn={true}>
                
                {buttonContent2.btnText}
            </CTAButton>  

            </div>

        </div>
        
        {/* this is for the coding animation div  */}

        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] border-2  border-blue-100/10">
        {backgroundGradient}
            <div className='text-center flex flex-col w-[10%] text-[#6E727F] font-[Inter] font-bold'>
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
                <p>12</p>

            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
            <TypeAnimation 
                sequence={[codeBlock, 5000, ""]} 
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={{
                    whiteSpace: "pre-line",
                    display: "block",
                }}
            />

            </div>

        </div>

    </div>
  )
}

export default CodeBlocks