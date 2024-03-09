import React from 'react';

function FormInput({id, placeholder, type, value, onChange, fieldColour, readOnly}) {
    const classDesign = `bg-${fieldColour}-50 border border-${fieldColour}-300 text-${fieldColour}-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`;
    return (
        <input
            type={type}
            id= {id}
            name= {id}
            placeholder = {placeholder}
            value={value}
            onChange={onChange}
            className={classDesign}
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            readOnly={readOnly}
        />

    );

}

export default FormInput;