import React from 'react';
import '../style/Card.scss';

const Card = () => {
    return (
        <div className="app-container">
            <div className="app-header">
                <h1>HMS:37 Media Coverage</h1>
            </div>
            <div className="app-content">
                <div className="app-card">
                    <div className="app-card-header">
                        <p>29 Oct 24</p>
                    </div>
                    <div className="app-card-image">
                        <img src="https://cdn.apollohospitals.com/dev-apollohospitals/2022/05/transplant-disclaimer-min.jpg" alt="Apollo Hospitals takes up a 4.5-Hour Stroke Treatment Promise with Advanced Stroke Care Ne..." />
                    </div>
                    <div className="app-card-body">
                        <h3>HMS Hospitals takes up a 4.5-Hour Stroke Treatment Promise with Advanced Stroke Care Ne...</h3>
                        <p>Apollo Hospitals Chennai is setting new standards in stroke care by extending it...</p>
                        <button className="app-card-button">Read More →</button>
                    </div>
                </div>
                <div className="app-card">
                    <div className="app-card-header">
                        <p>26 Oct 24</p>
                    </div>
                    <div className="app-card-image">
                        <img src="https://cdn.apollohospitals.com/dev-apollohospitals/2022/05/recruitment-disclaimer-min.jpg" alt="Apollo Cancer Centers Leads Breast Cancer Awareness with 'Pedal Pink' Cyclotho..." />
                    </div>
                    <div className="app-card-body">
                        <h3>HMS Cancer Centers Leads Breast Cancer Awareness with "Pedal Pink" Cyclotho...</h3>
                        <p>HMS Cancer Centers and Apollo Specialty Hospitals, Vanagaram, have taken a si...</p>
                        <button className="app-card-button"> Read More →</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;