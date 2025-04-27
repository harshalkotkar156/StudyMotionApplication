import React from 'react'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom';
import Frame from "../../../assets/Images/frame.png";
import LoginImage from "../../../assets/Images/login.webp";


const Login = () => {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
      })
    
      const [showPassword, setShowPassword] = useState(false)
    
      const { email, password } = formData
    
      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
      }
  return (
   <div className='flex justify-center mt-20'>




     <div className='text-white w-maxcontent '>

<div className='mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-5 py-12 md:flex-row md:gap-y-0 md:gap-x-12'>

    {/* left div  */}
    <div className='flex flex-col'>

        <div className='text-2xl font-bold'>Welcome Back</div>
        <div className='mt-3'>
                <p className='text-richblack-200'>Build skills for today, tomorrow, and beyond.</p>
                <p className='text-[#47A5C5] font-semibold font-display-edusa '>Education to future-proof your career.</p>

        </div>

        <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="outline-none focus:outline-none w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="outline-none focus:outline-none w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>


    </div>



    
    {/* right div  */}
    
                    <div className="relative w-fit h-fit">
                
                <img
                    src={Frame}
                    className="h-[400px] w-[400px]"
                    alt="bg-Frame"
                />

                {/* Login image slightly smaller and pulled to top-left so frame shows on bottom-right */}
                <img
                    src={LoginImage}
                    className="h-[400px] w-[400px] absolute top-0 left-0 translate-x-[-20px] translate-y-[-20px]"
                    alt="Login image"
                />
                </div>




</div>


</div>

   </div>
  )
}

export default Login