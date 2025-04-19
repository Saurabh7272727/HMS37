import React, { useEffect, useState } from 'react';
import '../style/ContactPage.scss';
import data from '../data/doctors.json';
import moreData from '../data/doctors2.json';
import LazyLoad from 'react-lazyload';
function ContactPage() {
    const [lazyLoading, setLazyLoading] = useState(false);
    const emptyArray = [...data, ...moreData];
    const totalLength = data.length + moreData.length;
    emptyArray.length = totalLength;


    useEffect(() => {
        setTimeout(() => {
            setLazyLoading(true);
        }, 3000);
    }, []);

    return (
        <div className="app">
            <header className="app__header">
                <div className="app__header-section">
                    <div className="app__header-section-icon">
                        <i className="fas fa-user-md"></i>
                    </div>
                    <div className="app__header-section-content">
                        <h3>HMS Lifeline</h3>
                        <p>Can be dialed irrespective of the telecom operator and location in India.</p>
                        <p>1860 500 1066</p>
                    </div>
                </div>
                <div className="app__header-section">
                    <div className="app__header-section-icon">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="app__header-section-content">
                        <h3>Hospital Locations</h3>
                        <p>HMS:37 Hospitals has been a pioneer in bringing worldclass healthcare to the doorsteps of every Indian.</p>
                        <p>FIND HOSPITAL NEAR YOU</p>
                    </div>
                </div>
                <div className="app__header-section">
                    <div className="app__header-section-icon">
                        <i className="fas fa-comments"></i>
                    </div>
                    <div className="app__header-section-content">
                        <h3>Contact Us</h3>
                        <p>We are here to assist you with any queries you may have.</p>
                        <p>Get in touch with us!</p>
                    </div>
                </div>
            </header>
            <main className="app__main">
                {
                    lazyLoading ? <div>
                        {
                            emptyArray.map((items, index) => {
                                return <div className='doctor_boxes' key={index}>
                                    <img src={items?.img || "https://as2.ftcdn.net/v2/jpg/02/23/50/73/1000_F_223507349_F5RFU3kL6eMt5LijOaMbWLeHUTv165CB.jpg"} alt="" />
                                    <div className='name_section'>{items?.name}</div>
                                    <div className='name_section_small'>{items?.timing}</div>
                                    <button>Contact</button>
                                </div>
                            })
                        }
                    </div> : <div>{
                        emptyArray.map((items, index) => {
                            return <div className='doctor_boxes_effect' key={index}>
                                <div>
                                </div>
                                <div className='name_section'></div>
                                <div className='name_section_small'></div>
                                <button>Contact</button>
                            </div>
                        })
                    }</div>
                }
            </main>
            <footer className='footer'>
                <div className='form_section'>
                    <input type="email" placeholder='Enter your email' />
                    <textarea name="" placeholder='write something' id="" cols="30" rows="10"></textarea>
                    <button type='submit'>Send</button>
                </div>
                <div className="sugges">
                    <h3>HMS:37</h3>
                    <h3>React Center</h3>
                    <h3>Student BCA</h3>
                </div>
            </footer>
        </div>
    );
}

export default ContactPage;