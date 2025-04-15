import React from 'react'
import { Link } from 'react-router-dom'

export const DataTags = ({data}) => {
    


    return (
    <div>

       <div className='w-[100%] bg-red-200'>

            <h2 className='text-[18px] font-bold text-white/80 mt-5'>{data.title}</h2>

            {
                data.links.map( (element ,index) => {
                    return (
                        <Link  className='w-[100%]' to={`/${element.link}`} key={index}>
                            <p className="my-2 text-sm  text-white/45 hover:text-white/80 transition-all duration-200" >{element.title}</p>
                        </Link>
                    )
                })
            }


       </div>


    </div>
  )
}
