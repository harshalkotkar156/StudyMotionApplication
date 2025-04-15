import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabName = [
    "Free",
    'New to coding',
   'Most popular',
    'Skills paths',
    'Career paths',
];


const ExploreMore = () => {


    const [currrentTab,setCurrentTab] = useState(tabName[0]);

    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]  = useState(HomePageExplore[0].courses[0].heading);


    const setMyCourse = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter( (course) => course.tag === value);
        console.log(result);
        setCourses(result[0].course);
        setCurrentCard(result[0].course[0].heading);


    }
    
  return (
    <div className='flex flex-col items-center'>
        
        <div className='text-4xl font-semibold text-center text-white'>
            Unlock the <HighlightText text={" Power of Code"} />
        </div>

        <p className='text-center text-[#838894] text-lg font-semibold mt-3'>
            Learn to Build Anything You Can Imagine
        </p>

        <div className='flex flex-row bg-[#161D29] mb-5 rounded-full mt-5 border-b-2 border-white/40 p-2 gap-2'>
            {

                tabName.map( (element,index) => {
                    return(
                        <div
                        className={`text-[16px] flex flex-row items-center gap-2 
                            ${currrentTab===element  ? "bg-[#000814] text-[#F1F2FF] font-medium" : "text-[#999DAA]"}  rounded-full transition-all duration-200 cursor-pointer hover:bg-[#000814] hover:text-[#F1F2FF] px-4 py-2`}
                            key={index}
                            onClick={ () => setMyCourse(element) }
                        > 
                        {element}
                        </div>
                    )
                })
            }

        </div>


        <div className='lg:h-[150px]'> </div>
        
        {/* coursee card here / */}

        <div className='absolute flex flex-row gap-10 justify-between w-full'>
            {
                
                courses.map( (element,index) => {
                    return (

                        <CourseCard
                        key={index}
                        cardData = {element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                    )
                })

            }
        </div>

    </div>
  )
}

export default ExploreMore;