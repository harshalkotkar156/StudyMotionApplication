import React from 'react';
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimeLineImage.png"

const timeLineData = [

    {
        logo:Logo1,
        heading : "Leadership",
        description:"Fully committed to the success company"
    },
    {
        logo:Logo2,
        heading : "Responsibility",
        description:"Students will always be our top priority"
    },
    {
        logo:Logo3,
        heading : "Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        logo:Logo4,
        heading : "Solve the problem",
        description:"Code your way to a solution"
    },

];  


const TimeLineSection = () => {
  return (
    <div className='mt-20'>

        <div className='flex flex-row gap-5 items-center'>

            <div className='w-[40%] flex flex-col gap-5'>

                {
                    timeLineData.map( (element,index) => {
                        return (
                           <div key={index}>

                                <div  className='flex flex-row gap-6'> 

                                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-4xl'> 
                                        <img src={element.logo} alt="" />
                                    </div>

                                    <div className=''>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-base'>{element.description}</p>
                                    </div>

                                </div>


                                {
                                    index!==3 ?
                                     
                                    (<div className='ml-6 h-[50px] border-l-2 border-black/25 border-dotted my-2'> </div>)
                                    
                                    : 
                                        
                                    (<div></div>) 
                                }

                            </div>

                        )
                    })
                }
            </div>

            <div className='w-[60%] relative bg-white shadow-[-15px_-15px_40px_#59c7f2] '>

                <img src={timeLineImage} alt="timeLineIMage" className='object-cover h-fit relative bottom-4 right-4'/>


                <div className='absolute bg-[#004A32] flex flex-row items-center text-white uppercase py-10 translate-x-[10%] translate-y-[-60%]'>


                    <div className=' flex items-center gap-5 border-r-2 border-[#00A075] px-7'>
                        <p className='text-3xl font-bold '>10</p>
                        <p className='text-sm text-[#00A075]'>years experience</p>
                    </div>    

                    <div className=' flex items-center gap-5 px-7 '>
                        <p className='text-3xl font-bold '>250</p>
                        <p className='text-sm text-[#00A075]'>Types of courses</p>
                    </div>  

                    


            
                </div>
            </div>

            
        </div>
    </div>
  )
}

export default TimeLineSection