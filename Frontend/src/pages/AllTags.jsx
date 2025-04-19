import React from 'react'
import '../style/AllTags.scss';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
const AllTags = () => {
    const navi = useNavigate();
    const centers = [
        {
            icon: 'heart-rate',
            title: 'Cardiology',
        },
        {
            icon: 'brain',
            title: 'Neurology',
        },
        {
            icon: 'gut',
            title: 'Gastroenterology',
        },
        {
            icon: 'bone',
            title: 'Orthopedic',
        },
        {
            icon: 'ribbon',
            title: 'Oncology',
        },
        {
            icon: 'uterus',
            title: 'Gynecology',
        },
        {
            icon: 'face',
            title: 'Dermatology',
        },
        {
            icon: 'eye',
            title: 'Ophthalmology',
        },
        {
            icon: 'bottle',
            title: 'Pediatrics',
        },
        {
            icon: 'thyroid',
            title: 'Endocrinology',
        },
        {
            icon: 'bladder',
            title: 'Urology',
        },
        {
            icon: 'kidney',
            title: 'Nephrology',
        },
        {
            icon: 'lung',
            title: 'Pulmonology',
        },
        {
            icon: 'joint',
            title: 'Rheumatology',
        },
        {
            icon: 'brain-2',
            title: 'Neurosurgery',
        },
        {
            icon: 'x-ray',
            title: 'Radiology',
        },
        {
            icon: 'scalpel',
            title: 'Plastic surgery',
        },
        {
            icon: 'baby',
            title: 'Neonatology',
        },
        {
            icon: 'blood-vessel',
            title: 'Vascular Surgery',
        },
        {
            icon: 'brain-3',
            title: 'Psychiatry',
        },
    ];

    const detailsArray = [
        {
            img: 'https://cdn.apollohospitals.com/apollohospitals-live/wca/01-Counters-Hospitals-1.svg',
            title: "Largest private healthcare network of Hospitals",
            num: '37+'
        },
        {
            img: 'https://cdn.apollohospitals.com/apollohospitals-live/wca/02-Counters-Clinics-2.svg',
            title: 'Largest private network of clinics across India',
            num: '700+'
        },
        {
            img: 'https://cdn.apollohospitals.com/apollohospitals-live/wca/03-Diagnostic-centres-2.svg',
            title: 'Diagnostic centres across India',
            num: '2300+'
        }, {
            img: 'https://cdn.apollohospitals.com/apollohospitals-live/wca/04-Pharmacies-2.svg',
            title: 'Pharmacies',
            num: '6000+'
        },
        {
            img: 'https://cdn.apollohospitals.com/apollohospitals-live/wca/06-Doctors-2.svg',
            title: 'Doctors',
            num: '4000+'
        },
        {
            img: "https://cdn.apollohospitals.com/apollohospitals-live/wca/hospital-bed.svg",
            title: 'Beds',
            num: "10000+"
        }
    ]
    return (
        <>
            <div className="container">
                <div className="card" onClick={() => navi('/appointment')}>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <p>Book Appointment</p>
                </div>
                <div className="card" onClick={() => alert('No response')}>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <p>Find Doctor</p>
                </div>
                <div className="card" onClick={() => navi('/findHospital')}>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-building"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 9v6"></path><path d="M15 9v6"></path><path d="M9 12h6"></path></svg>
                    </div>
                    <p>View Hospitals</p>
                </div>
                <div className="card" onClick={() => navi('/onlineconsult')}>
                    <div className="icon">
                        <img src="../../Cartoon Style Robot.jpg" alt="Ai" className='w-[100px] h-[70px]' />
                    </div>
                    <p>AI consult</p>
                </div>
                <div className="card">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-building"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 9v6"></path><path d="M15 9v6"></path><path d="M9 12h6"></path></svg>
                    </div>
                    <p>Study case</p>
                </div>
            </div>
            <section className="centers-of-clinical-excellence">
                <div className="container">
                    <img src="../../page-7.jpg" alt="" />
                    <div className="centers-list">
                        {centers.map((center, index) => (
                            <div key={index} className="center-item">
                                <i className={`icon-${center.icon}`}>{center.icon}</i>
                                <h3>{center.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Card />
            <div className="apllo">
                <div className="details_page">
                    <div className="text_section_all">
                        <h1>Why Choose HMS:37 Healthcare</h1>
                        <br />
                        <p>
                            Established by Dr Prathap C Reddy in 1983, HMS:37 Healthcare has a robust presence across the healthcare ecosystem. From routine wellness & preventive health care to innovative life-saving treatments and diagnostic services, Apollo Hospitals has touched more than 200 million lives from over 150 countries.
                        </p>
                    </div>
                    <div className="details_care_section">
                        {
                            detailsArray.map((items, index) => {
                                return (
                                    <div className='page_box' key={index}>
                                        <img src={items?.img} alt="" />
                                        <div className="contain_text">
                                            <p>{items?.num}</p>
                                            <h4>{items?.title}</h4>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <img src="../../page-8.jpg" alt="" />
            </div>
        </>
    )
}

export default AllTags;