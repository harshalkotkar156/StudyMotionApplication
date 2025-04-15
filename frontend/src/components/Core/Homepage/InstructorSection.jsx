import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import InstructorImage from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

import CTAButton from './Button';

const InstructorSection = () => {
  return (
    <div className='mt-20'>
        <div className='flex  gap-20 items-center justify-center '>


            <div className='w-[50%] bg-white'>
                <img 
                src={InstructorImage} alt="instructorImageSection" 
                className='relative top-6 left-6'
                />


            </div>


            <div className='flex flex-col gap-10 items-start w-[50%]'>
                <div className='text-4xl font-semibold max-w-[50%]'>
                    Become an 
                    <HighlightText text={" Instructor"}/>
                    
                </div>

                <p className='text-[19px] text-white/50 font-medium '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                <div>
                <CTAButton active={true} linkto={"/signup"}  borderOn={false}>
                        <div className='flex gap-2 items-center'>
                            {"Start Teaching Today"}
                            <FaArrowRight />
                        </div>
                </CTAButton> 
                    
                </div>

            </div>

        </div>


    </div>
  )
}

export default InstructorSection