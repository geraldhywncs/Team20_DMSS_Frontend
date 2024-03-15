import React from 'react';

const ErrorMessage = ({ setShowErrorMessage, message }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
                <p className="text-red-500">{message}</p>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowErrorMessage(false)}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default ErrorMessage;
