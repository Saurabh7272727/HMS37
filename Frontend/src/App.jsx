import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Signup from './pages/Signup.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import ProfilePage from './pages/User/ProfilePage.jsx';
import Error from './service/Error.jsx';
import Footer from './components/Footer.jsx';
import AppointmentPage from './pages/AppointmentPage.jsx';
import FormForApp from './pages/FormForApp.jsx';
import Findhospital from './pages/Findhospital.jsx';
import BookingPage from './pages/BookingPage.jsx';
import PrintfLetter from './pages/PrintfLetter.jsx';
import Onlineconsult from './pages/Onlineconsult.jsx';
import ContactPage from './pages/ContactPage.jsx';
import List from './pages/List.jsx';
import Test from './pages/Test.jsx';
import HMSDocumentary from './components/Dev.jsx';
import Admin from './pages/Admin.jsx';
import LocationPage from './pages/LocationPage.jsx';
import StudyCaseHMS from './pages/StudyCasePage.jsx';
import FindDoctorPage from './pages/FindDoctorPage.jsx';
const App = () => {
  const [data, setData] = useState();
  const userToken = Cookies.get('userToken');
  if (userToken) {
    useEffect(() => {
      fetchProfile();
    }, [userToken]);
  }
  async function fetchProfile() {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/patient/profile`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + userToken },
    });
    const result = await response.json();
    setData(result);
  }
  return (
    <>
      <BrowserRouter>
        <Header login={true} userData={data} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/:AuthPage' element={<Signup />} />
          <Route path='/profile' element={userToken ? <ProfilePage data={data} /> : <Error />} />
          <Route path='/profile/:page' element={<ProfilePage data={data} />} />
          <Route path='appointment' element={<AppointmentPage />} />
          <Route path='/formPage' element={<FormForApp />} />
          <Route path='/findHospital' element={<Findhospital />} />
          <Route path='/booking' element={<BookingPage userDataMain={data} />} />
          <Route path='/printf' element={<PrintfLetter />} />
          <Route path='/printf/:auto' element={<PrintfLetter />} />
          <Route path='onlineconsult' element={<Test />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/list' element={<List data={data} />} />
          <Route path='/devLever/' element={<HMSDocumentary />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<Error />} />
          <Route path='/LocationPage' element={<LocationPage />} />
          <Route path='/studycase' element={<StudyCaseHMS />} />
                <Route path='/FindDoctorPage' element={<FindDoctorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;

// main