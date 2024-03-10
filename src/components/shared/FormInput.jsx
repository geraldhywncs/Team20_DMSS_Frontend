import React, {useState, useEffect} from 'react';

function FormInput({id, placeholder, type, value, onChange, fieldColour, readOnly}) {
    const [classDesignChange, setClassDesignChange] = useState(true);
    useEffect(() => {
        setClassDesignChange(fieldColour);
    }, [fieldColour]);
    const classNameGray = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";
    const classNameRed = "bg-red-50 border border-red-300 text-red-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";
    return (

        <input
            type={type}
            id= {id}
            name= {id}
            placeholder = {placeholder}
            value={value}
            onChange={onChange}
            className={classDesignChange === "gray" ? classNameGray : classNameRed}
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            readOnly={readOnly}
        />

    );

}

export default FormInput;