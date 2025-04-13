import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div>
        {/* this is section one  */}
        <div className=' relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
            <Link to= {"/signup"}>

                <div className='group mt-16 p-1 rounded-full mx-auto bg-[#161D29] font-bold text-[#999DAA] transition-all duration-200 hover:scale-75 w-fit ' >
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-[#000814]  '>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>


            <div>
                Empower Your Future With 
            </div>

        </div>


    </div>

  )
}

export default Home;