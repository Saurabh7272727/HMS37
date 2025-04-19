import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIConsultationPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        age: '',
        gender: '',
        symptoms: ''
    });
    const messagesEndRef = useRef(null);

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI("AIzaSyDI6WaJ1MlIZjpaQJToM_yoGdvrJHACVF8");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message to chat
        const userMessage = { text: inputMessage, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Get Gemini model
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            // Create medical context prompt
            const prompt = `
        You are Dr. AI, a professional medical assistant at City General Hospital. 
        Respond to patient queries with professional, empathetic medical advice.
        Current patient information:
        - Name: ${userInfo.name || 'Not provided'}
        - Age: ${userInfo.age || 'Not provided'}
        - Gender: ${userInfo.gender || 'Not provided'}
        - Symptoms: ${userInfo.symptoms || 'Not provided'}

        Patient query: "${inputMessage}"
        
        Provide a concise, professional response with:
        1. Medical information (if applicable)
        2. Suggested next steps
        3. When to seek immediate care
        4. Disclaimers about consulting real doctors
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Add AI response to chat
            setMessages(prev => [...prev, { text: text, sender: 'ai' }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                text: "I'm having trouble connecting to the medical database. Please try again later or contact our hospital directly.",
                sender: 'ai'
            }]);
            console.error('Gemini API error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen">
            {/* Hospital Header */}
            <header className="bg-blue-800 text-white py-4 px-6 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-800 font-bold">H</span>
                        </div>
                        <h1 className="text-xl font-bold">HMS:37</h1>
                    </div>
                    <p className="text-blue-200">AI Medical Consultation</p>
                </div>
            </header>

            <div className="container mx-auto py-8 px-4 max-w-6xl">
                {/* Patient Information Form */}
                <div className="bg-white rounded-lg shadow-md p-2 w-[800px] mb-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={userInfo.name}
                                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={userInfo.age}
                                onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                                placeholder="35"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={userInfo.gender}
                                onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Main Symptoms</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={userInfo.symptoms}
                                onChange={(e) => setUserInfo({ ...userInfo, symptoms: e.target.value })}
                                placeholder="Headache, fever, etc."
                            />
                        </div>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Chat Header */}
                    <div className="bg-blue-700 text-white px-6 py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="font-bold">Dr. AI Assistant</h2>
                                <p className="text-xs text-blue-200">Powered by HMS:37 Medical AI</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="h-96 w-[1800px] overflow-y-auto p-4 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <p>Ask me about your symptoms, medications, or general health questions.</p>
                                <p className="mt-2 text-sm">I'll provide professional medical guidance.</p>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-3/4 rounded-lg px-4 py-2 ${message.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'}`}
                                    >
                                        <p className="whitespace-pre-wrap">{message.text}</p>
                                        {message.sender === 'ai' && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                This is not a substitute for professional medical advice. Always consult a doctor for serious concerns.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none px-4 py-2 shadow-sm">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 p-4 bg-white">
                        <form onSubmit={handleSubmit} className="flex space-x-2">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Describe your symptoms or ask a health question..."
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                disabled={isLoading || !inputMessage.trim()}
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-2">
                            For medical emergencies, call your local emergency number immediately.
                        </p>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    <p className="font-medium">Important Disclaimer:</p>
                    <p>This AI consultation service provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
                </div>
            </div>
        </div>
    );
};

export default AIConsultationPage;