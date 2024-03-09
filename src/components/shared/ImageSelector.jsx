import React from 'react';

function ImageSelector({imageList, selectedOption, handleOptionChange}) {
    return (
        <div>
            {imageList.map((option) => (
                <label
                    key={option.value}
                    className={`cursor-pointer ${selectedOption === option.value ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} p-3 rounded-lg mr-3`}
                >
                    <input
                        type="radio"
                        name="icon"
                        value={option.value}
                        onChange={() => handleOptionChange(option.value)}
                        checked={selectedOption === option.value}
                        className="hidden"
                    />
                    <span className="material-icons">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
}

export default ImageSelector;