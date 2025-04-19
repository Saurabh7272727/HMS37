import React, { useState } from 'react'
import data from '../data/doctors.json';
import '../style/AppointmentPage.scss'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Loading from '../utils/Loading';


const AppointmentPage = () => {
    const userToken = Cookies.get('userToken');
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const CheckHandler = (id, name) => {
        if (!userToken) {
            return alert('your are not logged in');
        } else {
            setLoading(true);
            Cookies.set('doctorId', id);
            Cookies.set('doctorName', name);
            setTimeout(() => {
                return navi('/formPage');
            }, 2500);
        }
    }
    return (
        <>
            {loading ? <Loading /> : <>

                <div className="filter_section">
                    <br /><br />
                    <h4>Doctor Id : </h4>
                    <select name="doctor" id="doctor">
                        {
                            data.map((items, index) => {
                                return <option key={index}>{items?.doctor_id}</option>
                            })
                        }
                    </select>
                </div>
                <div className="doctor_container">
                    {
                        data.map((items, index, array) => {
                            return (
                                <div className='doctor_box' key={index}>
                                    <div className="top_section">
                                        <img src={items.img ? items.img : "../../page-11.jpeg"} alt="" />
                                        <div className="details_section">
                                            <p>Registration No : {items?.doctor_id}</p>
                                            <h3>{items?.name}</h3>
                                            <p>Degree : {items?.degree}</p>
                                            <h4>Language : {items?.language[0]} ,{items?.language[1]}</h4>
                                            <h4>Experiences : {items?.experiences}</h4>
                                            <p>Timing : {items?.timing}</p>
                                            <br />
                                            <p>Address : {items?.address}</p>
                                        </div>
                                    </div>
                                    <div className="bottom_section">
                                        <button onClick={(e) => CheckHandler(items?.doctor_id, items?.name)}>BOOK AN APPOINTMENT</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>}


        </>
    )
}

export default AppointmentPage;