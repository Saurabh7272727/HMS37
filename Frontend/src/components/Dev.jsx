// HMSDocumentary.js
import { useState } from 'react';
import { FcPortraitMode } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
export default function HMSDocumentary() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-blue-800 mb-2">
                    🏥 Hospital Management System
                </h1>
                <p className="text-lg text-gray-600">
                    A modern healthcare solution built with React, Node.js, MongoDB & Tailwind CSS
                </p>
            </header>

            <div className="flex border-b mb-8">
                {['overview'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-6 py-3 font-medium ${activeTab === tab
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                {activeTab === 'overview' && <OverviewSection />}
            </div>
        </div>
    );
}



function OverviewSection() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">System Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                    icon="🔐"
                    title="Secure Auth"
                    description="JWT-based login/signup for patients and staff"
                />
                <FeatureCard
                    icon="📅"
                    title="Appointments"
                    description="Real-time doctor booking system"
                />
                <FeatureCard
                    icon="🛏️"
                    title="Bed Management"
                    description="Track ward occupancy and admissions"
                />
                <FeatureCard
                    icon=<FcPortraitMode />
                    title="Admin panel"
                    description="Admin track the record and commit changes(offical)"
                />
                <FeatureCard
                    icon=<FcPlus />
                    title="Doctor panel list"
                    description="Select your perfect doctor"
                />
            </div>
        </div>
    );
}


function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <span className="text-3xl mb-3 block">{icon}</span>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}