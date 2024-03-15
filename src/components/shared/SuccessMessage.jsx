import React from 'react';

const SuccessMessage = ({ setShowSuccessMessage, message }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
                <p className="text-green-500">{message}</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={setShowSuccessMessage}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default SuccessMessage;
