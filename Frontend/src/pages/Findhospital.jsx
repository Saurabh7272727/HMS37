import React, { useState } from 'react';
import '../style/FindHospital.scss';
import { IoArrowForward } from "react-icons/io5";
import { IoMdArrowRoundDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Findhospital() {
    const navi = useNavigate();
    const userToken = Cookies.get('userToken');
    const statewises = [
        {
            name: 'City List'
        }
        ,
        {
            name: "Ahmedabad"
        },
        {
            name: "Bangalore"
        }, {
            name: "Bhopal"
        },
        {
            name: "Chennai"
        },
        {
            name: "Mumbai"
        }, {
            name: "Gorakhpur"
        },
        {
            name: "Lucknow"
        }
    ]
    const details = [
        {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2020/09/apollo-home-ahmedabad-01.jpg",
            name: "Ahmedabad",
            address: "Plot No.1A, Bhat GIDC Estate Dist. Airport Gandhinagar Road, Dist. Gandhinagar, Ahmedabad - 382428 Gujarat",
            mobile_no: "8401801066"
        },
        {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2020/09/bangalore-new.jpg",
            name: "Bangalore",
            address: "154 / 11, Bannerghatta Road Opp. I.I.M Bangalore - 560 076",
            mobile_no: "(91)-80-2630 4050"
        },
        {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2023/05/ASH-PIC.jpg",
            name: "Bhopal",
            address: "Apollo Sage Hospitals, E-8 Extension, Arera Colony, Bhopal - 462026",
            mobile_no: "0755-4308101"
        }, {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2020/09/chennai-new.jpg",
            name: "Chennai",
            address: "21, Greams Lane, Off Greams Road Chennai – 600006",
            mobile_no: "+91-44-40401066"
        }, {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2020/09/Mumbai-new.jpg",
            name: "Mumbai",
            address: "Parsik Hill Road, Sector 23, CBD Belapur, Navi Mumbai - 400 614",
            mobile_no: "+(91)-22 3350 3350"
        }, {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2020/10/Kakinada-new.jpg",
            name: "Gorakhpur",
            address: "Gorakhpur",
            mobile_no: "8855757534"
        },
        {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2020/09/Lucknow-new.jpg",
            name: "Lucknow",
            address: "Apollomedics Super Speciality Hospitals Kanpur - Lucknow Rd, Sector B, Bargawan, LDA Colony, Lucknow, Uttar Pradesh 226012",
            mobile_no: "0522 67 88 888"
        }
        ,
        {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2020/09/Lucknow-new.jpg",
            name: "Lucknow",
            address: "Apollomedics Super Speciality Hospitals Kanpur - Lucknow Rd, Sector B, Bargawan, LDA Colony, Lucknow, Uttar Pradesh 226012",
            mobile_no: "0522 67 88 888"
        }
        ,
        {
            img: "https://cdn.apollohospitals.com/dev-apollohospitals/2020/09/Lucknow-new.jpg",
            name: "Lucknow",
            address: "Apollomedics Super Speciality Hospitals Kanpur - Lucknow Rd, Sector B, Bargawan, LDA Colony, Lucknow, Uttar Pradesh 226012",
            mobile_no: "0522 67 88 888"
        }
    ]
    const [List, setList] = useState(false);
    const ListHandler = (e) => {
        if (e == 'button') setList(!List);
    }


    const NavigateBooking = () => {
        if (userToken) {
            return navi('/booking');
        } else {
            return navi('/auth/signup');
        }
    }
    return (
        <>
            <div className="findHoapital_main">
                <div className="box_mail">
                    <select required>
                        {
                            statewises?.map((items, index) => {
                                return (
                                    <option key={index} value={items.name}>{items.name}</option>
                                )
                            })
                        }
                    </select>
                    <br />
                    <button onClick={() => ListHandler('button')}>Booking Online  {List ? <IoMdArrowRoundDown /> : <IoArrowForward />}</button>
                    {
                        List ? <ul>
                            <li onClick={() => NavigateBooking()}>Bed Booking</li>
                            <li onClick={() => navi('/appointment')}>Appointment</li>
                            <li>Online Consult</li>
                        </ul> : ""
                    }<br />
                    <button>Near Hospital</button><br />
                    <button>More...</button>
                </div>
                <div className="gallery_section_box">
                    {
                        details.map((items, index) => {
                            return (
                                <div key={index}>
                                    <img src={items.img} alt="" />
                                    <div className="rap_song">
                                        <p>{items.name}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};


export default Findhospital
