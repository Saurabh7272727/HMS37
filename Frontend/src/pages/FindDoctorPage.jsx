import React, { useState } from 'react';
import Data from '../data/doctors.json';
import data1 from '../data/doctors2.json';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const doctorsData = [
  ...Data, ...data1
];

const FindDoctorPage = () => {
  const [search, setSearch] = useState('');

  const filteredDoctors = doctorsData.filter((doctor) =>
    `${doctor.name} ${doctor.specialization} ${doctor.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

   const userToken = Cookies.get('userToken');
    // const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const CheckHandler = (id, name) => {
        if (!userToken) {
            return alert('your are not logged in');
        } else {
            // setLoading(true);
            Cookies.set('doctorId', id);
            Cookies.set('doctorName', name);
            setTimeout(() => {
                return navi('/formPage');
            }, 200);
        }
    }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Find a Doctor</h1>

      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          className="w-full p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search by name, specialization, or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-md p-6 text-center">
            <img
              src={doctor.img}
              alt={doctor.name}
              className="mx-auto w-24 h-24 rounded-full object-cover mb-4 border"
            />
            <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
            <p className="text-blue-500">{doctor.specialization}</p>
            <p className="text-gray-500 text-sm">{doctor.location}</p>
            <p className="mt-2 text-yellow-500 font-medium">⭐ {doctor.rating}</p>
            <button onClick={(e) => CheckHandler(doctor?.doctor_id, doctor?.name)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </div>
        ))}
        {filteredDoctors.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No doctors found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default FindDoctorPage;
