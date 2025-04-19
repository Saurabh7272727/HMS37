import React from 'react'
import '../../style/Booking.scss'
import { useNavigate } from 'react-router-dom'
const Pending = ({ userName }) => {
    const navi = useNavigate();
    return (
        <>
            <div className="booking-table">
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Patient Name</th>
                            <th>Aadhaar Number</th>
                            <th>Print</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userName.map((row, index) => (
                            <tr key={index}>
                                <td>{row.bookingId}</td>
                                <td>{row?.name} - <span className='text-blue-400'>{row?.roomNumber}</span> <span className='text-green-500'>{row?.bedNumber}</span></td>
                                <td>{row.aadhaar}</td>
                                <td onClick={() => navi(`/printf/${row.bookingId}`)} style={{ backgroundColor: '#333', color: "white", cursor: 'pointer' }}>Click</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Pending;