import React from 'react';

const Section = ({ title, description, image, reverse }) => (
  <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-8 my-12`}>
    <div className="md:w-1/2">
      <img src={image} alt={title} className="rounded-lg shadow-md w-full h-64 object-cover" />
    </div>
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const StudyCaseHMS = () => {
    const image = [
        'https://img.freepik.com/free-photo/doctor-are-well-good-taken-care-elderly-patients-hospital-bed-patients-feel-happiness-medical-healthcare-concept_1150-21713.jpg?ga=GA1.1.623131946.1746976348&semt=ais_hybrid&w=740',
        'https://img.freepik.com/free-vector/pediatric-room-flat-composition-with-friendly-doctors-smiling-little-patients-vector-illustration_1284-83012.jpg?ga=GA1.1.623131946.1746976348&semt=ais_hybrid&w=740',
        'https://img.freepik.com/free-photo/doctor-is-checking-patient-s-blood-pressure_482257-62872.jpg?ga=GA1.1.623131946.1746976348&semt=ais_hybrid&w=740',
        'https://img.freepik.com/premium-photo/doctors-nurses-interacting-with-patients_1198884-17078.jpg?ga=GA1.1.623131946.1746976348&semt=ais_hybrid&w=740'
    ]
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12 md:px-20">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Study Case: Hospital Management System</h1>

      {/* Section 1: Introduction */}
      <Section
        title="Introduction"
        description="In today's healthcare landscape, hospitals face increasing pressure to digitize operations while maintaining high patient care standards. Our HMS solution bridges this gap with smart, intuitive systems."
        image={`${image[0]}`}
      />

      {/* Section 2: Problem Statement */}
      <Section
        title="The Problem"
        description="Manual record-keeping, lack of centralized patient data, scheduling inefficiencies, and data security issues were crippling hospital performance and patient satisfaction."
      image={`${image[1]}`}
        reverse
      />

      {/* Section 3: Our Solution */}
      <Section
        title="Our Solution"
        description="We developed a cloud-integrated HMS tailored to hospital workflows. Features include real-time appointment scheduling, EMR integration, secure staff management, and analytics dashboards."
      image={`${image[2]}`}
      />

      {/* Section 4: Key Features */}
      <Section
        title="Key Features of HMS"
        description="• Digital Patient Records\n• Smart Scheduling\n• Billing & Insurance Modules\n• Role-Based Access for Doctors, Admins & Staff\n• Automated Reports and Alerts"
         image={`${image[3]}`}
        reverse
      />

      {/* Section 5: Results */}
      <Section
        title="Impact & Results"
        description="Our client hospital reported a 40% increase in patient processing speed, 25% reduction in operational overhead, and enhanced patient satisfaction within just 3 months of implementation."
        image={`${image[1]}`}
      />

      <div className="text-center mt-16">
        <p className="text-sm text-gray-500">© 2025 HealthTech Solutions</p>
      </div>
    </div>
  );
};

export default StudyCaseHMS;
