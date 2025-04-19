import React, { useState, useRef, useEffect } from 'react'
import { ImHome } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { RiApps2AiFill } from "react-icons/ri";
import { MdOutlineBedroomChild } from "react-icons/md";
import { FaChalkboardUser } from "react-icons/fa6";
import { MdViewComfy } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
// import { useRef } from 'react';
const Admin = () => {
    const [currentComponent, setCurrentComponent] = useState(0); // Default to 0 (Home)

    const ButtonHandler = (index) => {
        // console.log(index);
        setCurrentComponent(index);
    }

    return (
        <>
            <div className='w-screen h-[90vh] flex justify-center items-center flex-col'>
                <div className='w-[70%] h-[70%] rounded-lg'>
                    {LoaderComponent(currentComponent)}
                </div>
                <div className='w-[70%] h-[20%] rounded-lg flex justify-center items-center relative'>
                    <div className='w-[80%] h-[70px] bg-gray-200 rounded-2xl blur-sm'></div>
                    <div className='w-[80%] h-[70px] bg-transparent ring-2 ring-slate-800 blur-none rounded-2xl absolute top-13 flex justify-start items-center pl-9'>
                        {[<ImHome />, <TbBrandBooking />, <RiApps2AiFill />, <MdOutlineBedroomChild />].map((items, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => ButtonHandler(index)}
                                    className={`${(currentComponent == index) ? " text-black" : "text-sky-600"} text-[34px]  pl-8 hover:scale-90 hover:text-sky-300 focus:scale-95 cursor-pointer `}
                                >
                                    {items}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;

function LoaderComponent(componentIndex) {
    switch (componentIndex) {
        case 0:
            return <Home />;
        case 1:
            return <Booking />;
        case 2:
            return <Appointment />;
        case 3:
            return <RoomList />;
        default:
            return <Home />;
    }
}

function Home() {
    // console.log('home')
    return <>
        <div className='w-[100%] h-[40%] flex pt-4 pl-[7em]'>
            {([{ title: "Users", due: "Linked users", icon: <FaChalkboardUser /> },
            { title: "Bed Booking", due: "To check available bed", icon: <MdOutlineBedroomChild /> },
            { title: "Comfirmed Appointment", due: "Commit changes", icon: <RiApps2AiFill /> },
            ]).map((items, index) => {
                return <div key={index} className='w-[20%] h-[200px] text-white bg-sky-500 rounded-lg ring-2 ring-blue-900 ml-5 flex justify-center items-center text-start flex-col cursor-not-allowed'>
                    <h1 className='text-[55px] text-sky-950'>{items?.icon}</h1>
                    <h2 className='pt-3 text-gray-700 font-semibold'>{items?.title}</h2>
                    <p className='font-light text-slate-300'>{items?.due}</p>
                </div>
            })
            }
        </div>
        <img src="../../19195.jpg" alt="" />
    </>
}

function Booking() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:3000/bookingList', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => {
                return res.json();
            }).then((e) => setDatas(e?.data));
        }

        fetchData();
    }, [])
    return <>
        <div className='w-[100%] h-[100%] flex flex-col items-center pt-3 overflow-y-scroll  pl-7'>
            {datas.map((items, index) => {
                return <div key={index} className='w-[100%] h-[300px] flex-none mt-2 pl-5 pt-5 odd:bg-gray-100 even:bg-gray-200'>
                    <div>
                        <h1>patient Name - {items?.name}</h1>
                        <br />
                        <h1>ADHR - {items?.aadhaar}</h1>
                        <h1>Admission date - {items?.admissionDate}</h1>
                        <p>Admission time - {items?.admissionTime}</p>
                    </div>
                    <div>
                        <h1>Email - {items?.email}</h1><br />
                        <p>Room Number - {items?.roomNumber}</p>
                        <p>Bed Number - {items?.bedNumber}</p>
                    </div>
                </div>
            })}
        </div>
    </>
}

function Appointment() {
    const [conData, setConData] = useState([]);
    const [reqData, setReqData] = useState([]);
    const checkboxRefs = useRef([]);
    const [tempArray, setTempArray] = useState([]);

    // fetch all types of data on mongooseDB;
    const fetchData = async (url, method) => {
        const base = 'http://localhost:3000' + `${url}`;

        const response = await fetch(base, {
            method: `${method}`,
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();
        return result;
    }
    useEffect(() => {
        const insideUseEffectData = async () => {
            fetchData('/appointment', "GET").then(e => setConData(e?.data));
            fetchData('/applog', "GET").then(e => setReqData(e?.data));
        }

        insideUseEffectData();
    }, []);

    const handlerByUser = (index, user) => {
        const { name } = user;
        const findInTempArray = tempArray.filter((items, index) => {
            return items.name == name;
        });

        if (findInTempArray.length > 0) {
            const filter = tempArray.filter((items, index) => {
                return items.name != name;
            });
            setTempArray(() => {
                return filter;
            });
            return;
        } else {
            setTempArray((saurabh) => {
                return [...saurabh, user];
            });
        }
    }


    const SelectHandler = (e) => {

        checkboxRefs.current.forEach((items) => {
            items.checked = true;
        });

        setTempArray(() => { return [...reqData] });
        return;
    }

    const submitHandler = () => {

        const localList = reqData.filter((items, index) => {
            return (!(tempArray.some(a => a.name == items.name)))
        });

        setReqData(localList);

        setConData((saurabh) => {
            return [...saurabh, ...tempArray];
        });

        for (let i = 0; i < tempArray.length; i++) {
            async function PostDataBYIN(url) {
                const base = 'http://localhost:3000' + `${url}`;
                fetch(base, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: tempArray[i]?._id })
                });
            }

            PostDataBYIN('/submit')
        }
        checkboxRefs.current.forEach((items) => {
            items.checked = false;
        });
        setTempArray([]);

    }

    const cancelHandler = () => {
        const filterTemp = reqData.filter((items, index) => {
            return (!(tempArray.some(e => items.name == e.name)));
        })


        setReqData(filterTemp);
        checkboxRefs.current.forEach((items) => {
            items.checked = false;
        });
        for (let i = 0; i < tempArray.length; i++) {
            async function PostDataBYIN(url) {
                const base = 'http://localhost:3000' + `${url}`;
                fetch(base, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: tempArray[i]?._id })
                });
            }

            PostDataBYIN('/deleteApp')
        }
        return;
    }
    return <>
        <p className='text-slate-600 font-semibold p-1'>Appointment Management Tool</p>
        <div className='w-[100%] h-[100%] flex'>
            <div className='w-[25%] h-[100%] bg-slate-500 pt-4 px-1 overflow-y-scroll'>
                {
                    conData.map((items, index) => {
                        return (
                            <li className='list-none py-3 bg-white mt-1 rounded-lg text-black'>{items.name} - ADHR{items?.aadhaar}</li>
                        )
                    })
                }
            </div>
            <div className='w-[75%] h-[100%] '>
                <div className='w-[100%] h-[40px] flex justify-end items-center'><span>Select All</span><input type='checkbox' title='Select All' onChange={(e) => SelectHandler(e)} className='w-[30px] h-[30px] text-slate-900' /></div>
                <div className='w-[100%] h-[93.39%] pt-1 px-2 overflow-y-scroll'>
                    {
                        reqData[0]?.name ? "" : <h1 className='text-red-700'>No any appointment request</h1>
                    }
                    {
                        reqData.map((items, index) => {
                            return (
                                <div className='w-[100%] h-[50px] odd:bg-gray-400 even:bg-slate-100 flex justify-between items-center px-4'>
                                    <h1>{items?.name} - ADHR{items?.aadhaar}</h1>
                                    <input className='w-[20px] h-[20px]' ref={(el => checkboxRefs.current[index] = el)} type="checkbox" onChange={() => handlerByUser(index, items)} />
                                </div>
                            )
                        })
                    }</div>
            </div>
        </div>
        <div className='w-[100%] h-[50px] flex justify-end space-x-6 pr-[200px] mt-[24px] '>
            <button onClick={() => cancelHandler()} className='px-6  py-2 text-[21px] font-light bg-red-700 z-30 text-white rounded-md'>Cancel</button>
            <button onClick={() => submitHandler()} className='px-6 py-2 text-[21px] font-light hover:scale-95 z-30 bg-green-700 text-white rounded-md'>Submit</button>
        </div>
    </>
}

function RoomList() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:3000/bedList', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => {
                return res.json();
            }).then((e) => { setDatas(e?.data) });
        }

        fetchData();
    }, []);

    console.log(datas);
    return <>
        <div className='w-[100%] h-[100%] flex flex-col items-center'>
            {
                datas.map((items, index) => {
                    return (
                        <div key={index} className='w-[90%] h-[85px] bg-slate-400 text-black mt-1 space-y-1 px-3 flex flex-col items-end justify-center'>
                            <button className='bg-green-600 px-4 py-2 text-white font-semibold'>Room Number - {items?.roomNumber}</button>
                            <div className='w-[100%] h-[35px] flex flex-row justify-between items-center'>
                                {
                                    items?.beds.map((gg, index) => {
                                        return (
                                            <div key={index}>
                                                <h1 className={`bg-${gg?.backgroundColor}-600 px-5 py-2 text-[15px] text-white font-semibold`}>BedNo-{gg?.bedNumber}</h1>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
}



