import React from 'react';

function ImageSelector({imageList, selectedOption, handleOptionChange}) {
    return (
        <div>
            {imageList.map((image, index) => (
                <label
                    key={index}
                    className={`cursor-pointer ${selectedOption === image ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} p-3 rounded-lg mr-3`}
                >
                    <input
                        type="radio"
                        name="icon"
                        value={image}
                        onChange={() => handleOptionChange(image)}
                        checked={selectedOption === image}
                        className="hidden"
                    />
                    <span className="material-icons">
                        {image}
                    </span>
                </label>
            ))}
        </div>
    );
}

export default ImageSelector;