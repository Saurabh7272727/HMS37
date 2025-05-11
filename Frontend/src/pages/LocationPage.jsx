import React from 'react';

const LocationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        {/* Image Section */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            className="object-cover w-full h-full"
            src="https://www.hhmglobal.com/wp-content/uploads/press-releases/17441/Apollo-Hospitals-1068x599.jpg"
            alt="Location"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">HMS:37</h2>
          <p className="text-gray-600 mb-4">
            We are located in the heart of the city with easy access to transportation, cafes, and public parks.
            Come by and experience our space in person!
          </p>
          <div className="text-sm text-gray-700">
            <p><strong>Address:</strong> 123 Main St, Delhi, India</p>
            <p><strong>Hours:</strong> Mon - Fri, 9AM - 9PM</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
          </div>
        </div>
      </div>

      {/* Optional: Map Embed */}
      <div className="w-full max-w-4xl mt-8 rounded-lg overflow-hidden shadow-lg">
       <iframe
          title="Delhi Google Map"
          className="w-full h-64 border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28028.33760644484!2d77.20797745!3d28.6264138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd36f77dc5df%3A0x5c5d7ed9c0cf7c5c!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1583856794050!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default LocationPage;
