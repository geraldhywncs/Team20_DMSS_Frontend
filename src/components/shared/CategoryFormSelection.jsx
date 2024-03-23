import React, { useState, useEffect } from 'react';

function CategoryFormSelection({ id, value, onChange, optionsList, label, fieldColour }) {
    const classDesign = `bg-${fieldColour}-50 border border-${fieldColour}-300 text-${fieldColour}-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (optionsList && optionsList.length > 0) {
            setCategories(optionsList);
        }
    }, [optionsList]);

    return (
        <div>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={classDesign}
            >
                <option value="">{`${label}`}</option>
                {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategoryFormSelection;
