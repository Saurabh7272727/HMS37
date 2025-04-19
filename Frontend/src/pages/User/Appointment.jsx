import React from 'react'
import '../../style/ProfilePage.scss';

const Appointment = ({ userData }) => {
    const data = userData?.data?.Appointment;
    return (
        <>
            <div className="profileAppointmentList_page">
                <table>
                    <tr>
                        <th>Appointment Id</th>
                        <th>Patient name</th>
                        <th>problem</th>
                        <th>status</th>
                        <th>Doctor Id</th>
                        <th>setting</th>
                    </tr>
                    {
                        data?.map((items, index) => {
                            return (
                                <tr key={index}>
                                    <td>{items?.appointmentId}</td>
                                    <td>{items?.name}</td>
                                    <td>{items?.problem}</td>
                                    <td style={items?.status == 'request' ? { color: "red" } : { color: 'green' }}>{items?.status}</td>
                                    <td>{items?.doctorDetails?.doctorId}</td>
                                    <td><button style={{ backgroundColor: 'red', color: "white", padding: '2px 3px', border: 'none' }}>cancel</button></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}

export default Appointment;