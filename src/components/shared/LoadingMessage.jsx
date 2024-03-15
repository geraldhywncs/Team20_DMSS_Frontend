import React from 'react';

const LoadingMessage = ({ message }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="p-8 rounded-md">
                        <div className="flex items-center justify-center white-btn body-medium font-bold">
                            <span className="material-icons animate-spin h-5 w-5 mr-3">
                                autorenew
                            </span>
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingMessage;
