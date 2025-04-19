import React, { useState } from 'react'
import '../style/login.scss';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navi = useNavigate();

    const [inputData, setInputData] = useState({
        email: "",
        password: "",
    });

    const InputOnChange = (e) => {
        const { name, value } = e.target;
        const CopyDataInput = { ...inputData };
        CopyDataInput[name] = value;
        setInputData(CopyDataInput);
    }
    const LoginFormSubmission = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/patient/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData),
        });
        const result = await response.json();
        const { success, message, data, token } = result;
        if (success) {
            toast.success(message);
            Cookies.set('userToken', token);
            return navi('/');
        } else {
            toast.error(message);
        }
    }
    return (
        <>
            <div className='login_section'>
                <form onSubmit={LoginFormSubmission}>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={InputOnChange} name='email' id='email' required placeholder='example@gmail.com' /><br />
                    <label htmlFor="password">password</label>
                    <input type="password" onChange={InputOnChange} name='password' id='password' required placeholder='saurabhsharma' />
                    <br />
                    <button>
                        Login
                    </button>
                    <br />
                    <p style={{ color: 'skyblue' }}>"Welcome back! Please login to continue."</p><br />
                    <p>Region-code :: JS37</p>
                </form>
            </div>
            <ToastContainer position='bottom-center' />
        </>

    )
}

export default Login;