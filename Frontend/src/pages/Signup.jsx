import React, { useEffect, useState } from 'react'
import '../style/Signup.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Login from './Login.jsx';
import OtpComponent from '../components/OtpComponent.jsx';
import { RxCross1 } from "react-icons/rx";
const Signup = () => {
    document.title = 'Signup';
    const { AuthPage } = useParams();
    const navi = useNavigate();
    const [comformationForm, setComformationForm] = useState(false);
    const [enable, setEnable] = useState(false);
    const [data, setData] = useState('');
    const [otp, setOtp] = useState({
        otp: ''
    });
    const [inputData, setInputData] = useState({
        fullname: '',
        email: '',
        password: '',
    });
    const inputHandler = (e) => {
        const { name, value } = e.target;
        const copyDataInput = { ...inputData };
        copyDataInput[name] = value;
        setInputData(copyDataInput);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setEnable(true);
        const responce = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/patient/otp`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData)
        });

        const result = await responce.json();
        const { success, message, data } = result;
        if (success) {
            setComformationForm(true);
            setData(data);
            return toast.success(message)
        } else {
            setTimeout(() => window.location.reload(), 3000);
            return toast.error(result.message);
        }
    }
    const OtpHandler = (e) => {
        // const { name, value } = e.target;
        // const copydata = { ...otp };
        // copydata[name] = value;
        setOtp({ otp: e });
    }
    const submissionObject = { ...data, ...otp };
    const ConformDataHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/patient/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionObject),
        });
        const result = await response.json();
        const { data, success, message } = result;
        if (!success) {
            return toast.error(message);
        } else {
            Cookies.set('userToken', data.token);
            setTimeout(() => navi('/'), 2600);
            return toast.success(message);
        }
    }

    const boxOtpHandler = () => {
        setComformationForm(false);
        setEnable(false);
    }
    return (
        <>
            <div className="signup_page">
                <div className="sigup_left_page"></div>
                {
                    comformationForm ? <div className='signup_page_right'>
                        <div className='form_section relative'>
                            <form onSubmit={(e) => ConformDataHandler(e)}>
                                <label htmlFor="fullname">Full Name</label>
                                <input type="text" name='fullname' value={data?.fullname} id='fullname' required placeholder='Ex- saurabh sharma' /><br />
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' value={data?.email} id='email' required placeholder='example@gmail.com' /><br />
                                <label htmlFor="password">Your password "don't change"</label>
                                <input type="password" name='password' value={data?.password} id='password' required placeholder='saurabhsharma' /><br />
                                {/* <label htmlFor="otp">OTP:37</label>
                                <input type="number" name='otp' onChange={OtpHandler} id='otp' required placeholder='write otp here' autoFocus />
                                <br /> */}
                                <button type='submit' className='mt-[100px]'>Verify</button>
                            </form>
                            <div className='w-[500px] min-w-[400px] h-[400px] bg-slate-800 flex justify-center items-center absolute top-0 translate-y-[-20px] rounded-lg'>
                                <OtpComponent email={data.email} OtpHandler={OtpHandler} />
                                <button onClick={() => boxOtpHandler()} className='w-[10%] h-[90%] bg-transparent flex justify-start pt-3 pl-3 text-2xl text-white'><RxCross1 /></button>
                            </div>
                        </div>
                    </div> : <div className="signup_page_right">
                        <div className="part_divied">
                            {
                                AuthPage == 'signup' ? <button onClick={() => navi('/auth/login')}>Login</button> : <button onClick={() => navi('/auth/signup')}>SignUp</button>
                            }
                        </div>
                        <div className="form_section">
                            {
                                AuthPage == 'signup' ? <form onSubmit={(e) => submitHandler(e)}>
                                    <label htmlFor="fullname">Full Name</label>
                                    <input type="text" onChange={inputHandler} name='fullname' id='fullname' required placeholder='Ex- saurabh sharma' autoFocus /><br />
                                    <label htmlFor="email">Email</label>
                                    <input type="email" onChange={inputHandler} name='email' id='email' required placeholder='example@gmail.com' /><br />
                                    <label htmlFor="password">Create a password</label>
                                    <input type="password" onChange={inputHandler} name='password' id='password' required placeholder='saurabhsharma' />
                                    <br />
                                    {enable ? <button disabled>Loading.....</button> : <button>SignUp</button>}
                                    <br />
                                    <p style={{ color: 'red' }}>* you have already account , to click on top side</p>
                                    <p style={{ color: 'red' }}>* password are must have 8 character</p>
                                    <br />
                                    <p>Hi' surviour</p><br />
                                    <p> :: Emphasizes both the medical expertise and the empathetic nature of care.</p><br />
                                    <h5>In healthcare, a policy refers to a set of guidelines or principles that govern how a healthcare facility or system operates. This could include things like patient care standards, confidentiality policies (HIPAA in the U.S.), or medical ethics.</h5>

                                </form> : <Login />
                            }
                        </div>
                    </div>
                }

            </div>
            <ToastContainer position='top-center' />
        </>
    )
}

export default Signup;