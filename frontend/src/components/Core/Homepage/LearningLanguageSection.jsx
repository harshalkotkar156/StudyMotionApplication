import React from 'react'
import HighlightText from './HighlightText';
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import CompareWithOthers from "../../../assets/Images/Compare_with_others.png";
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png"; 
import CTAButton from './Button';
const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px] flex flex-col items-center gap-5 mb-18'>

        <div className='text-4xl font-bold'>
            Your swiss knife for
            <HighlightText text={" learning any language"}></HighlightText>

        </div>

        <div className='mt-5 text-[18px] max-w-[70%] text-center text-black/80'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center max-w-[1260px]'>
            <img src={knowYourProgress} alt="knowYourProgress" className='object-contain -mr-32' />
            <img src={CompareWithOthers}   alt="CompareWithOthers" className='object-contain' />
            <img src={PlanYourLessons}   alt="PlanYourLessons" className='object-contain -ml-32' />
        </div>

        <div>
            <CTAButton active={true} linkto={"/signup"} borderOn={false}>
                {"Learn More"}
            </CTAButton>   
        </div>

    </div>
  )
}

export default LearningLanguageSection;