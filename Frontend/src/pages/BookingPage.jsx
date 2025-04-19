import React, { useState, useEffect } from 'react'
import '../style/BookingPage.scss';
import Loading from '../utils/Loading.jsx';
import Cookies from 'js-cookie';
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const BookingPage = ({ userDataMain }) => {
    const navi = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        aadhaar: '',
        admissionDate: '',
        admissionTime: '',
        roomNumber: '',
        bedNumber: '',
    });
    const userToken = Cookies.get('userToken');
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(false);

    const [roomList, setRoomList] = useState();
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/patient/profile`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + userToken },
        });
        const result = await response.json();
        const { data, success, message } = result;
        if (!success) {
            return <h1>Something was wrong "try again"</h1>
        } else {
            const arraySection = data?.Appointment
            const dataMain = await arraySection.filter((items) => {
                return items?.appointment_id?.status == 'confirmed';
            });
            setLoading(true);
            return setUserData(dataMain);
        }
    }
    const ListHandler = () => {
        setList(!list);
    }


    useEffect(() => {
        FetchDataAll();
    }, []);
    async function FetchDataAll() {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/book/showRoomList`, {
            method: 'GET',
        });
        const data = await response.json();
        setRoomList(data);
    };


    const [check, setCheck] = useState('');
    const [bedsList, setBedList] = useState();
    const roomCardHandler = (roomNumber, beds) => {
        formData.roomNumber = roomNumber;
        setCheck(roomNumber);
        setBedList(beds);
    }

    const [bedNumberList, setBedNumberList] = useState('');
    const bedNumberHandler = (bedNumber) => {
        formData.bedNumber = bedNumber.bedNumber;
        if (!bedNumber.booked) {
            bedNumber.backgroundColor = 'blue';
        }
        setBedNumberList(bedNumber.bedNumber);
    }

    const InputHandler = (e) => {
        const { name, value } = e.target;
        const copyDatByInput = { ...formData };
        copyDatByInput[name] = value;
        setFormData(copyDatByInput);
    }

    const FormSubmitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/book/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${userToken}`,
            },
            body: JSON.stringify(formData)
        })

        const result = await response.json();
        const { success, message, status } = result;
        if (!success) {
            return toast.error(message);
        } else {
            setTimeout(() => {
                navi('/');
            }, 3000);
            return toast.success(message);
        }
    }


    return (
        <>
            <ToastContainer position='top-center' />
            {
                loading ? <div className='top_of_booking'>
                    <button onClick={ListHandler}>List of confirmed Appointment {list ? <BiSolidRightArrow /> : <BiSolidLeftArrow />}</button>
                    {
                        list ? <div className='list_main'>
                            <table>
                                <tr>
                                    <th>Appointment Id</th>
                                    <th>Patient Name</th>
                                    <th>Aadhaar No</th>
                                    <th>Status</th>
                                    <th>Optional</th>
                                </tr>
                                {
                                    userData.map((items, index) => {
                                        return <tr key={index}>
                                            <td>{items?.appointment_id.appointmentId || "No any confirmed appointment"}</td>
                                            <td>{items?.appointment_id.name}</td>
                                            <td>{items?.appointment_id.aadhaar}</td>
                                            <td style={items?.appointment_id.status == 'confirmed' ? { color: 'green' } : { color: 'white' }}>{items?.appointment_id.status}</td>
                                            <td className='apply_btn'>Apply</td>
                                        </tr>
                                    })
                                }

                            </table>
                        </div> : ""
                    }
                </div> : <Loading />
            }
            <br /><br />
            <div className="bed-booking-container">
                <h2>Patient Bed Booking</h2>
                <form onSubmit={(e) => FormSubmitHandler(e)}>
                    <div className="form-group">
                        <label htmlFor="patientName">Patient Name:</label>
                        <input type='text' name='name' onChange={InputHandler} required placeholder='Enter Patient Name' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientName">Patient Aadhaar Number:</label>
                        <input type='number' name='aadhaar' onChange={InputHandler} required placeholder='Enter aadhaar card number' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admissionDate">Admission Date:</label>
                        <input type='date' name='admissionDate' onChange={InputHandler} required placeholder='Date for booking' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admissionTime">Admission Time:</label>
                        <input type='time' name='admissionTime' onChange={InputHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admissionTime">Email of User</label>
                        <input type='email' name='email' required value={userDataMain?.data?.email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Choose Room Number:</label>
                        <div className="bed-options">
                            {
                                roomList?.map((bedNumber, index) => {
                                    return <div key={index} onClick={() => roomCardHandler(bedNumber.roomNumber, bedNumber.beds)} className={` ${bedNumber.roomNumber == check ? "bed-number_2" : "bed-number"}`}>
                                        {bedNumber.roomNumber}
                                    </div>
                                })
                            }
                        </div>
                    </div><br /><br />
                    <hr />
                    <div className="form-group">
                        <label>Choose Bed Number</label>
                        {
                            bedsList ? <div className='bed-options-2'>
                                {
                                    bedsList.map((bed, index) => {
                                        return (
                                            <div key={index} onClick={() => bedNumberHandler(bed)} className={`${(bed.bedNumber == bedNumberList) ? "button_2" : "button"}`} style={{ backgroundColor: `${bed.backgroundColor}` }} >
                                                {bed.bedNumber}
                                            </div>
                                        )
                                    })
                                }
                            </div> : "First choose room number..."
                        }
                    </div>
                    <button type="submit" className="submit-button">Book Bed</button>
                </form>
            </div>
            <br />
        </>
    )
}

export default BookingPage;