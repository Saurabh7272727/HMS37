import React, { useState } from 'react'
import '../style/Printf.scss';
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
const PrintfLetter = () => {
    const { auto } = useParams();
    const [number, setNumber] = useState(auto ? auto : "");

    const [formShow, setFormShow] = useState(false);
    const [data, setData] = useState('');
    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/book/print`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId: number })
        })
        const result = await response.json();
        const { data, success, message, status } = result;
        if (!success) {
            return toast.error(message);
        }

        toast.success(message);
        setData(data)
        setTimeout(() => {
            setFormShow(true);
        }, 1000);

        setTimeout(() => {
            window.print();
        }, 3000);
    };
    return (
        <>
            <ToastContainer position='top-center' />
            {
                formShow ? <div>
                    <br />
                    <br />
                    <h2>Letter show example :</h2>
                    <br />
                    <ul>
                        <li>Booking Id :  {data?.bookingId}</li>
                        <li>Patient Name : {data?.name}</li>
                        <li>Aadhaar Number : {data?.aadhaar}</li>
                    </ul>
                </div> : <div className="app-container">
                    <form className="input-section" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            className="number-input"
                            name='bookingId'
                            value={number}
                            onChange={(e) => handleNumberChange(e)}
                            placeholder="Enter a booking id"
                        />
                        <button className="submit-btn" type='submit'>Print</button>
                    </form>

                    <div className="content-section">
                        <h2 className="heading">Welcome to HMS:37 print service</h2>
                        <p className="description">
                            there are uses of to print your information details
                        </p>

                        <div className="images">
                            <img src="../../page-12.avif" alt="Image 1" className="image" />
                            <img src="../../page-13.avif" alt="Image 2" className="image" />
                            <img src="../../page-14.webp" alt="Image 3" className="image" />
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default PrintfLetter;