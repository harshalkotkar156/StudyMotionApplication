import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/Core/Homepage/HighlightText';
import CTAButton from '../components/Core/Homepage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/Core/Homepage/CodeBlocks';
import { TypeAnimation } from 'react-type-animation';
import TimeLineSection from "../components/Core/Homepage/TimeLineSection";
import LearningLanguageSection from '../components/Core/Homepage/LearningLanguageSection';
import InstructorSection from "../components/Core/Homepage/InstructorSection";
import FooterSection from "../components/Core/Homepage/FooterSection";
import ExploreMore from "../components/Core/Homepage/ExploreMore";



const Home = () => {
  return (
    <div>
        {/* this is section one  */}
        <div className=' relative mx-auto max-w-[1100px] flex flex-col w-11/12 items-center text-white justify-between'>
            <Link to= {"/signup"}>

                <div className='group mt-16 p-1 rounded-full mx-auto bg-[#161D29] font-bold text-[#999DAA] transition-all duration-200 hover:scale-75 w-fit border-b-2 border-[#2E343E] hover:border-0 ' >
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-[#000814]  '>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>


            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future With <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='mt-4 w-[80%] text-center text-lg font-bold text-[#838894]'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"} borderOn={true}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"} borderOn={true}>Book a demo</CTAButton>
            </div>

            <div className='mx-3 my-16 bg-white  shadow-[-40px_-40px_45px_#093A50] '>
                <video className='relative bottom-4 right-4' muted autoPlay loop src={Banner}></video>
            </div>

             {/* code sectrion 1     */}

             <div>

                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                             <HighlightText text={" Coding Potential "} />
                              with our online courses
                        </div>
                    }
                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                    buttonContent1={
                        {
                            btnText : "Try it Yourself",
                            linkto : "/signup",
                            active:true
                        }
                    }
                    buttonContent2={
                        {
                            btnText : "Learn more",
                            linkto : "/login",
                            active:false
                        }
                    }
                    
                    codeBlock= {`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is mypage</title>\n</head>\n<body>\n<h1>Hello, world!</h1>\n<p>This is my first web page.</p>\n<a href="https://www.example.com">Visit Example</a>\n</body>\n</html>`}
                    codeColor={"text-yellow-500"}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                    borderOn={true}
                />


             </div>

             <div>


             <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                             <HighlightText text={" Coding in Seconds "} />
                              
                        </div>
                    }
                    subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                    buttonContent1={
                        {
                            btnText : "Continue Lesson",
                            linkto : "/signup",
                            active:true
                        }
                    }
                    buttonContent2={
                        {
                            btnText : "Learn more",
                            linkto : "/login",
                            active:false
                        }
                    }

                    codeBlock= {`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is mypage</title>\n</head>\n<body>\n<h1>Hello, world!</h1>\n<p>This is my first web page.</p>\n<a href="https://www.example.com">Visit Example</a>\n</body>\n</html>`}
                    codeColor={"text-white"}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                    borderOn={true}
                />

             </div>
        </div>


        {/* this is section 2 with with white backgroud */}
        
        <ExploreMore/>

        <div className='bg-[#F9F9F9] text-[#2C333F] '>

            <div className='homepage_bg h-[333px]'>

                <div className='w-11/12 max-w-[1260px]  flex flex-col items-center gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                    <CTAButton active={true} linkto={"/signup"}  borderOn={false}>
                        <div className='flex gap-2 items-center'>
                            {"Explore Full Catalog"}
                            <FaArrowRight />
                        </div>
                    </CTAButton>  

                    <CTAButton active={false} linkto={"/signup"} borderOn={false}>
                        <div className='flex gap-2 items-center'>
                            {"Learn More"}
                             
                        </div>
                    </CTAButton>  
                    </div>

                </div>

            </div>



            <div className='mt-20 w-11/12 max-w-[1260px] mx-auto flex flex-col items-center justify-between gap-7'>
            
                <div className='flex gap-42 '>

                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a
                        <HighlightText text={" job that is in Demand"} />
                    </div>
                    
                    <div className='flex flex-col gap-10 w-[40%] items-start'>

                        <div className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>

                        <CTAButton active={true} linkto={"/signup"} borderOn={false}>
                            
                            {"Learn More"}
                             
                        </CTAButton>  

                    
                    </div>

                </div>




            <TimeLineSection/>


            <LearningLanguageSection/>
                
            
            </div>


        </div>




        {/* this is section 3 with black backgroud  */}

        <div className='w-11/12 mx-auto max-w-[1260px] flex flex-col items-center justify-between gap-8 first-letter bg-[#000814] text-white'>
            
            <InstructorSection/>

            <h2 className='text-4xl font-semibold my-14'>Reviews from other Learners</h2>
            

        </div>


        {/* this is 4 th section of the blackish Backgroud  */}

        <div className='text-white mt-10  bg-[#161D29] flex items-center justify-center'>
            <FooterSection/>
        </div>


    </div>

  )
}

export default Home;