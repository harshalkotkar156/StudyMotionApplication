
import toast from "react-hot-toast";
import { setLoading,setSignupData,setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";


export function getPasswordResetFunction(email,setemailSent){
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST',RESETPASSWORD_API ,{email});

            console.log("Response : " , response);
            if(!response.data.success){
                throw new Error(response.data.message);
                 
            }

            toast.success("Reset Email Sent");
            setemailSent(true);


        } catch (error) {
            console.log("Reset password token error");

        }
         dispatch(setLoading(false));
         
    }
 }