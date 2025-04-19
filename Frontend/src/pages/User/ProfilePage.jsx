import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Appointment from './Appointment';
import Conform from './Conform';
import Pending from './Pending';
import Setting from './Setting';
import cookies from 'js-cookie';
const ProfilePage = ({ data }) => {
    const userName = data?.data?.fullname;
    const { page } = useParams();
    const [appointment, setAppointment] = useState(true);
    const [pending, setPending] = useState(false);
    const [conform, setConform] = useState(false);
    const [setting, setSetting] = useState(false);

    const ButtonHandler = (e) => {
        switch (e) {
            case 'pending':
                setPending(true);
                setAppointment(false);
                setConform(false);
                setSetting(false);
                break;
            case 'conform':
                setPending(false);
                setAppointment(false);
                setConform(true);
                setSetting(false);
                break;
            case 'setting':
                setPending(false);
                setAppointment(false);
                setConform(false);
                setSetting(true);
                break;
            default:
                setPending(false);
                setAppointment(true);
                setConform(false);
                setSetting(false);
                break;
        }
    }


    const LogoutHanlder = () => {
        cookies.remove('userToken');
        window.location.reload();
    }
    return (
        <div className="min-h-screen  bg-gray-50 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-8xl bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Profile Header Section */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-900 flex items-center justify-center text-white text-5xl sm:text-6xl font-bold">
                            {userName?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-white">
                            <h3 className="text-xl sm:text-2xl font-bold">Name: {userName}</h3>
                            <h3 className="text-lg sm:text-xl mt-2">Email: {data?.data?.email}</h3>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => ButtonHandler()}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${appointment ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Appointment
                        </button>
                        <button
                            onClick={() => ButtonHandler('pending')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${pending ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Bookings
                        </button>
                        <button
                            onClick={() => ButtonHandler('conform')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${conform ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Conform
                        </button>
                        <button
                            onClick={() => ButtonHandler('setting')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${setting ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Setting
                        </button>
                    </nav>
                </div>

                {/* Content Section */}
                <div className="p-6 bg-gray-50 min-h-[400px]">
                    {appointment && <Appointment userData={data} />}
                    {conform && <Conform />}
                    {pending && <Pending userName={data?.data.booking} />}
                    {setting && <Setting />}
                </div>

                {/* Footer/Logout Section */}
                <div className="bg-gray-800 px-6 py-4 flex justify-end">
                    <button onClick={() => LogoutHanlder()} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;