import React, { useState } from 'react'
import {db,auth} from '../firebaseConfig'
import {ref,set,push} from 'firebase/database'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const countryCode = "+91"
    const [phone,setPhone] = useState(countryCode)
    const [otp,setOtp] = useState("")
    const [expandForm,setExpandForm] = useState(false)

    const generateReCaptcha = () => {
        window.recaptchaVerfier = new RecaptchaVerifier('recaptcha-container',{
            'size':"invisible",
            "callback": (res) =>{

            }
            
        },auth)
    }


    const requestOTP = (e) =>{
        e.preventDefault()
        if(phone.length >= 12){
            generateReCaptcha()
            setExpandForm(true)
            let verify = window.recaptchaVerfier
            signInWithPhoneNumber(auth,phone,verify).then((confirmation) =>{
                window.confirmation = confirmation
            }).catch((error) => {
                console.log(error)
            })
            
        }
    }
    const nav = useNavigate()
    const verifyOtp = (e) => {
        let otp = e;
        setOtp(otp);
        if (otp.length == 6){
            // console.log(otp)
            let confirmation = window.confirmation
            confirmation.confirm(otp).then((result) => {
                const user = result.user
                localStorage.setItem("userData",user)
                nav('/')
            }).catch((error) => {
                console.log(error)
            })
        }
        
    }
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-6 mx-auto">
                        <div className="card shadow">
                            <div className="card-body">
                                <form action="" method="post" onSubmit={(e) => requestOTP(e)}>
                                    <div className="mb-3">
                                        <label htmlFor="">Phone</label>
                                        <input type="text" name="name" id="" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>    
                                    {(expandForm) && <div className="mb-3">
                                        <label htmlFor="">OTP</label>
                                        <input type="number" name="otp" id="" className="form-control"  onChange={(e) => verifyOtp(e.target.value)} />
                                    </div>  }  
                                    <div className="mb-3">
                                        <input type="submit" value="Send OTP" id="recaptcha-container" className='btn btn-success w-100' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>   
                </div>
                <div className="row">
                    <div className="card recaptcha-container">
                        {/*  */}
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default Login