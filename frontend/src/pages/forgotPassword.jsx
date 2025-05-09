import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const forgotPassword = () => {

    const [emailSent , setemailSent] = useState(false);
    const [email , setemail] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setemailSent));


    }


  return (
  
    <div className='text-white flex justify-center items-center'>

        {
            loading ? (<div>Loading...</div>) : 
            (
                <div>
                    <h1>
                        {
                            !emailSent ?  "Reset your password" : "Check your Email"
                        }

                    </h1>

                    <p>
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have send the reset email to ${email}`
                        }

                    </p>


                    <form  onSubmit={submitHandler}>
                        {
                            !emailSent && (
                                <label>
                                    <p>Email Address*:</p>
                                    <input 
                                    required
                                    name='email'            
                                    type="email"
                                    value={email}
                                    onChange={ (e) => setemail(e.target.value)}
                                    placeholder='Enter your email address'
                                    />

                                </label>
                            )
                        }
                        <button type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend Mail"
                            }
                        </button>


                    </form>

                    <div>
                        <Link to="/login">
                            <p>Back to login</p>
                        </Link>
                    </div>

                </div>

            )
        }

    </div>

  )
}

export default forgotPassword