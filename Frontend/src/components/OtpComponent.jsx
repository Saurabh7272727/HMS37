import React, { useRef, useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";

const OtpComponent = ({ email, OtpHandler }) => {
    const [digitOtp, setDigitOtp] = useState(Array(6).fill(''));
    const inputRef = useRef([]);

    const InputChangeHandler = (e, index) => {
        const value = e.target.value;

        if (value && !/^[0-9]$/.test(value)) {
            return;
        }

        const newOtp = [...digitOtp];
        newOtp[index] = value;
        setDigitOtp(newOtp);

        if (value && index < 5) {
            inputRef.current[index + 1].focus();
        }

        // Call the OTP handler when all fields are filled
        if (newOtp.every(digit => digit !== '') && newOtp.length === 6) {
            OtpHandler(newOtp.join(''));
        }
    }

    const onKeyHandler = (e, index) => {
        if (e.key === 'Backspace' && !digitOtp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        } else if (e.key === 'Backspace' && digitOtp[index]) {
            const newOtp = [...digitOtp];
            newOtp[index] = '';
            setDigitOtp(newOtp);
        }
    }

    return (
        <div className='w-[80%] h-[90%] inline-block bg-slate-800 rounded-lg p-6'>
            <h2 className='text-[22px] text-white font-semibold'>Verification Code</h2>
            <p className='w-[80%] pt-5 text-[16px] text-white font-semibold'>
                We have sent the verification code to your email address
            </p>

            <div className='mt-8 flex justify-center'>
                {digitOtp.map((item, index) => (
                    <input
                        key={index}
                        ref={(el) => inputRef.current[index] = el}
                        name='otp'
                        onKeyDown={(e) => onKeyHandler(e, index)}
                        onChange={(e) => InputChangeHandler(e, index)}
                        value={digitOtp[index]}
                        autoFocus={index === 0}
                        type='text'
                        className='w-[50px] text-center text-2xl min-w-[40px] h-[50px] mx-2 text-black bg-white ring-2 ring-orange-600 rounded-md focus:outline-emerald-500 focus:ring-2 focus:ring-emerald-500'
                        maxLength={1}
                        inputMode='numeric'
                    />
                ))}
            </div>

            <div className='mt-8 flex w-full justify-center space-x-2 text-white items-center'>
                <IoMdNotificationsOutline className='text-2xl' />
                <p className='text-blue-300 font-semibold'>{email}</p>
            </div>
        </div>
    )
}

export default OtpComponent;