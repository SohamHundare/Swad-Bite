import React from 'react';

function NeedHelp(params) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-200 hover:scale-105">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Need Help?</h2>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                        {/* Phone Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                        </svg>
                        Call us at:
                    </span>
                    <span className="font-medium text-gray-800">+1 (123) 456-7890</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                        {/* Email Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 7.5-9.75-7.5" />
                        </svg>
                        Email us at:
                    </span>
                    <span className="font-medium text-gray-800">SwadBite@gmail.com</span>
                </div>
            </div>
        </div>
    );
}

export default NeedHelp;