import React from 'react'

const BannerTest = () => {
    return (
        <>
            <div className='h-[80vh] w-screen flex flex-row justify-around items-center mb-9' style={{ backgroundColor: '#0080A8' }}>
                <div className='w-[40%] h-[90%] flex flex-col justify-center items-center'>
                    <h1 className='text-[45px] text-gray-200 font-semibold'>HMS hospital</h1>
                    <h1 className='text-[18px] text-gray-300 font-semibold'>"The good physician treats the disease; the great physician treats the patient who has the disease." — William Osler</h1>
                    <br />
                    <br />
                    <h1 className='text-[22px] text-sky-300 font-semibold'>Find a doctor & book online</h1>
                </div>
                <div className='w-[40%] h-[90%] rounded-lg  ring-8 ring-blue-300 relative'>
                    <img className='w-[100%] h-[100%] object-contain' src="../../doctors-day-cute-young-handsome-man-lab-coat-glasses-smiling-holding-book.jpg" alt="" />
                    <img className='w-[60%] h-[60%] absolute top-2 rounded-[50%] translate-x-[-100px]' src="../../happy-doctor-holding-clipboard-with-patients.jpg" alt="" />
                    <img className='w-[30%] h-[30%] absolute top-2 rounded-[50%] left-[90px] translate-y-[300px]' src="../../healthcare-workers-preventing-virus-quarantine-campaign-concept-cheerful-friendly-asian-female-physician-doctor-with-clipboard-daily-checkup-standing-white-background.jpg" alt="" />
                </div>
            </div>

        </>
    )
}

export default BannerTest;