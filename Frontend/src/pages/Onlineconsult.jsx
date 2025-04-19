import React from 'react'
import '../style/Onlineconsult.css'
function Onlineconsult() {
    return (
        <div>
            <img src="../../page-15.jpg" alt="" />

            <div className='mainboxconsult'>

                <div class="consultation-form">
                    <h1>Online Doctor Consultation</h1>
                    <form action="#" method="POST">
                        <div class="form-group">
                            <label for="name">Full Name:</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address:</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number:</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
                        </div>
                        <div class="form-group">
                            <label for="symptoms">Describe Your Symptoms:</label>
                            <textarea id="symptoms" name="symptoms" rows="5" placeholder="Describe your symptoms in detail" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="appointment">Preferred Appointment Time:</label>
                            <select id="appointment" name="appointment" required>
                                <option value="">Select a time</option>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="appointment">Preferred Appointment Date:</label>
                            <input type="date" name="date" required />
                        </div>
                        <div class="form-group">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Onlineconsult
