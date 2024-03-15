import React from 'react';

function FormLabel({label}) {
    return (
        <label htmlFor="label" className="flex items-center block mb-2 text-sm font-medium dark:text-white">
            {label}
        </label>

    );

}

export default FormLabel;