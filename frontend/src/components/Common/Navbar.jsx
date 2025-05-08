import React, { useEffect, useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropDown from "../Core/Auth/ProfileDropDown";
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {

  const {token} = useSelector( (state) => state.auth);
  const { user } = useSelector((state) => state.profile)
  const {totalItems} = useSelector((state) => state.cart)

  const [subLinks , setsublinks] = useState([]);
  // const subLinks = [
  //   {
  //     title : "Python",
  //     link : "catalog/python"
  //   },
  //   {
  //     title : "AI and ML",
  //     link : "catalog/aiml"
  //   }
  // ]

  async function getSublinks() {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      const temp = result.data.allTags;
      // console.log("Result fetched:", temp);
    
      // console.log("type of temp is:", typeof temp);
      setsublinks(temp);
      // console.log("The new array is:", subLinks);

      // for(const obj in subLinks){
      //   console.log("name is: ",obj.name);
      // }

    } catch (error) {
      console.log(error);
      console.log("Error while fetching Data");
    }
  }

  useEffect( () => {
    getSublinks();
  },[subLinks]);


  const location = useLocation()
  const matchRoute = (route) => {
    return matchPath({path:route} , location.pathname);
  }
  return (
    
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>

      <div className='flex w-11/12 max-w-maxcontent items-center justify-between'>

          <Link to={"/"}>
            <img src={Logo} width={160} height={42} loading='lazy' alt="Logo" />
          </Link>


          <nav>

            <ul className='flex gap-x-6 text-richblack-25'>
              {
                NavbarLinks.map((link,index) => {
                 return (
                  <li key={index}>
                  {
                    link.title ==="Catalog" ? 
                    (<div className='relative flex items-center gap-1 group'>
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle className='mt-1' />

                      <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[30%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-50'>
                      <div className='absolute left-[50%] rounded h-6 w-6 rotate-45 bg-richblack-5 translate-y-[-40%] top-0 translate-x-[75%] '></div>


                      {
                        subLinks.length ? 
                        (
                          subLinks.map( (subLinks ,index) => {
                            return (
                              <Link to={`catalog/${subLinks.name}`} key={index} className='mt-1 p-2 rounded-md transition-all duration-200  hover:bg-richblack-25 hover:font-bold hover:text-richblack-800'>
                                  <p className='capitalize'>{subLinks.name}</p>
                            </Link>
                            )
                          })
                        )  : 
                        (<div> Empty</div>)
                      }
                      
                      </div>  

                    </div>): 
                   
                    (
                      <Link to={link?.path}>
                        <p className= {`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"} `} >
                          {link.title}</p>
                      </Link>
                    )
                  }
                </li>
                 )
                })
              }

            </ul>

          </nav>

        {/* this is the login/signup buttons section  */}
        <div className='flex gap-x-4 items-center'>
            {
              user && user?.accountType != "Instructor" && (
                  <Link to="/dashboard/cart" className='relative'>
                    <FaCartShopping />
                    {
                      totalItems > 0 ? 
                      (<span>
                        {totalItems}
                      </span>) : (<div></div>)

                    }
                  </Link>
              )

            }

            {

              token ===null && (
                <Link to="/login" >
                  <button className='text-richblack-100 border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md hover:cursor-pointer  hover:scale-75 transition-all duration-150'>Login</button>
                </Link>
              )
            }

            {

            token ===null && (
              <Link to="/signup" >
                <button className='text-richblack-100 border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md hover:cursor-pointer hover:scale-75 transition-all duration-150'>Sign Up</button>
              </Link>
            )
            }


            {
              token !==null && <ProfileDropDown />
            }

        </div>      


      </div>

    </div>
  )
}

export default Navbar