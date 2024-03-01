import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const AddTransactionPage = ({ closePopup }) => {
    const [transactionTitle, setTransactionTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currency, setCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('day');
    const [selectedGroupOption, setGroupOption] = useState('');
    

    const handleTransactionTitle = (e) => {
        setTransactionTitle(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        console.log(`Selected category: ${selectedValue}`);
      };

      const handleAmountChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setAmount(numericValue);
      };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCurrency = (e) => {
        setCurrency(e.target.value);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleGroupChange = (e) => {
        setGroupOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
      
    return (
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-3 rounded-t dark:border-gray-600">
            <button
                type="button"
                className="text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closePopup}
            >
                <svg class="h-8 w-8 text-black-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            </button>
        </div>
        <form class="p-4 md:p-3">
            <div className="grid gap-4 mb-4 grid-cols-1">
                <div className="col-span-2">
                    <label htmlFor="icons" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Icons
                    </label>
                    <div className="flex items-center gap-4">
                        <label className={`cursor-pointer ${selectedOption === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} p-2.5 rounded-lg`}>
                            <input type="radio" name="icon" value="day" onChange={() => handleOptionChange('day')} checked={selectedOption === 'day'} className="hidden" />
                            <svg class="h-8 w-8 text-slate-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></svg>
                        </label>
                        <label className={`cursor-pointer ${selectedOption === 'night' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} p-2.5 rounded-lg`}>
                            <input type="radio" name="icon" value="night" onChange={() => handleOptionChange('night')} checked={selectedOption === 'night'} className="hidden" />
                            
                        </label>
                    </div>
                </div>
                

                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={transactionTitle}
                        onChange={handleTransactionTitle}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                    />
                </div>


                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                        <option value="">Select category</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Transport">Transport</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows="3"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                        style={{ resize: 'none' }}
                    ></textarea>
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Currency
                    </label>
                    <select
                        id="currency"
                        value={currency}
                        onChange={handleCurrency}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                        <option value="">Select Currency</option>
                        <option value="SGD">SGD</option>
                        <option value="MYR">MYR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
                

                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Amount
                    </label>
                    <input
                        type="text"  // Use type="text" instead of type="number"
                        name="amount"
                        id="amount"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                        onChange={handleAmountChange}
                        value={amount}
                    />
                </div>

                <div className="col-span-2">
                    <label htmlFor="group" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Group
                    </label>
                    <select
                        id="group"
                        value={selectedGroupOption}
                        onChange={handleGroupChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                        <option value="">Select group</option>
                        <option value="group1">Group 1</option>
                        <option value="group2">Group 2</option>
                        <option value="group3">Group 3</option>
                    </select>
                </div>
            </div>
            <button type="scanReceipt" class="text-blue inline-flex items-center bg-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-white-800">
                Scan Receipt
            </button>
            <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Create Transaction
            </button>
        </form>
    </div>

    );
}

export default AddTransactionPage;
