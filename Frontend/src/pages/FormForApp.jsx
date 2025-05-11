import React, { useState } from 'react';
import '../style/FormForApp.scss';
import Cookies from 'js-cookie';
import data from '../data/doctors.json';
import { QRCodeSVG } from 'qrcode.react';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const AppointmentForm = () => {
    const navi = useNavigate();
    const userToken = Cookies.get('userToken')
    const doctorId = Cookies.get('doctorId');
    const doctorName = Cookies.get('doctorName');
    const [qrcode, setQrcode] = useState(false);
    const [loading, setLoading] = useState(false);
    const nwData = data.filter((items) => {
        return items?.doctor_id === doctorId;
    });
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        problem: '',
        aadhaar: '',
        address: '',
        pinCode: '',
        status: 'request',
        state: '',
        doctorDetails: { doctorId: nwData[0]?.doctor_id, name: nwData[0]?.name },
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };
    const randomNumber = generateRandomString();
    console.log(randomNumber);
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Wait...');
        setTimeout(() => {
            setQrcode(true);
        }, 6000);
    };

    const submitHandlerByCon = async () => {
        const conform = prompt('Enter your payment code');
        if (conform === randomNumber) {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/provider/enter`, {
                method: 'POST',
                headers: { "Authorization": "bearer " + userToken, 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            const { success, message, status } = result;
            if (success) {
                setLoading(true);
                toast.success(message);
                setTimeout(() => {
                    navi('/profile');
                }, 3000);
                return;
            } else {
                toast.error(message);
                toast.error('Payment failed');
                setLoading(false);
            }
        } else {
            alert('cancel your payment');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    return (
        <>
            <div className="formContainer">
                <div className="appointment-form-container">
                    <h2>Appointment Form</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Problem */}
                        <div>
                            <label htmlFor="problem">Problem:</label>
                            <textarea
                                id="problem"
                                name="problem"
                                value={formData.problem}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* Aadhaar Number */}
                        <div>
                            <label htmlFor="aadhaar">Aadhaar Number:</label>
                            <input
                                type="text"
                                id="aadhaar"
                                name="aadhaar"
                                value={formData.aadhaar}
                                onChange={handleChange}
                                pattern="[0-9]{12}"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address">Address:</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* PIN Code */}
                        <div>
                            <label htmlFor="pinCode">PIN Code:</label>
                            <input
                                type="text"
                                id="pinCode"
                                name="pinCode"
                                value={formData.pinCode}
                                onChange={handleChange}
                                pattern="[0-9]{6}"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="request">Request</option>
                            </select>
                        </div>

                        {/* State */}
                        <div>
                            <label htmlFor="state">State:</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button type="submit">Submit Appointment</button>
                        </div>
                    </form>
                </div>
                <div className="doctor_deatils">
                    <h2>Doctor Name : {nwData[0]?.name}</h2><br />
                    <p>Degree : {nwData[0]?.degree}</p>
                    <p>Timing : {nwData[0]?.timing}</p>
                    {/* <QRCodeSVG value={randomNumber} size={234} /> */}
                </div>
            </div>
            {

                qrcode ? <div className='qr_code'>
                    {
                        loading ? <ReactLoading type={'spin'} color={'#343A40'} height={100} width={100} /> :
                            <div className="box_qr">
                                <QRCodeSVG value={randomNumber} size={234} />
                                <button onClick={submitHandlerByCon}>Submit</button>
                            </div>
                    }

                </div> : ""
            }
            <ToastContainer />
        </>

    );
};

export default AppointmentForm;
