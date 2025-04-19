import React from 'react';
import { useNavigate } from 'react-router-dom';
const DashboardCard = ({ data }) => {
    const navi = useNavigate();
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg m-4">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Account holder Dashboard</h1>
                    <p className="text-gray-500">Welcome List section, {data?.data?.email}</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                    <div onClick={() => navi('/profile')} className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center cursor-pointer text-white font-semibold">
                        {data?.data?.fullname.charAt(0)}
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card 1 */}
                <div className="bg-indigo-50 p-6 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Total Appointments</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">+{data?.data?.Appointment.length}</h3>
                            <p className="text-green-500 text-sm mt-2">+12.5% from current month</p>
                        </div>
                        <div className="p-3 rounded-lg bg-indigo-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-blue-50 p-6 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Bed Bookings</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">+{data?.data?.booking.length}</h3>
                            <p className="text-green-500 text-sm mt-2">+{(data?.data?.booking.length) / 30}% from last month</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Total Active</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{data?.data?.booking.length + data?.data?.Appointment.length}</h3>
                            <p className="text-red-500 text-sm mt-2">-{(data?.data?.booking.length + data?.data?.Appointment.length) / 15}% from current month</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View All</button>
                </div>

                {/* Activity List */}
                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-start p-4 hover:bg-gray-100 rounded-lg transition-colors">
                            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-800">Project Update #{item}</h4>
                                <p className="text-gray-500 text-sm mt-1">New milestone achieved in the current sprint</p>
                            </div>
                            <span className="text-gray-400 text-sm">2h ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;