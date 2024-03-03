import React, { useState } from 'react';
import Button from "../shared/Button";
import ImageSelector from "../shared/ImageSelector";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import FormSelection from "../shared/FormSelection";
import FormTextarea from "../shared/FormTextarea";
import FormSection from "../shared/FormSection";
import CreateTransactionButton from "../api/CreateTransaction";


const AddTransactionPage = ({ closePopup }) => {
    const [transactionTitle, setTransactionTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currency, setCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('commute');
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


    const imageList = ["commute", "flight_takeoff", "home", "shopping_cart", "sports_esports", "restaurant", "cake", "cruelty_free", "snowboarding", "fitness_center", "checkroom"];
    const category = ["Travel", "Shopping", "Transport"];
    const currencyList = ["SGD","MYR","USD"];
    const groupList = ["Group 1","Group 2","Group 3"];
    return (
        <div className="relative bg-white rounded-lg shadow p-4 overflow-y-auto">
        <div className="flex items-center justify-between rounded-t dark:border-gray-600">
            <button
                type="button"
                className="text-black bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closePopup}
            >
                <span className="material-icons">
                    close
                </span>
            </button>

        </div>
        <form class="p-7 md:p-7">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <FormSection col="2">
                        <FormLabel
                            label={"Icon"}
                        />
                        <ImageSelector 
                            imageList = {imageList}
                            selectedOption = {selectedOption}
                            handleOptionChange = {handleOptionChange}
                        />
                </FormSection>
                
                <FormSection col="2" place="1">
                    <FormLabel
                        label={"Title"}
                    />
                    <FormInput
                        id = {"title"}
                        placeholder = {"Title"}
                        type = {"text"}
                        value={transactionTitle}
                        onChange={handleTransactionTitle}
                    />
                </FormSection>

                
                <FormSection col="2" place="1">
                    <FormLabel
                        label={"Category"}
                    />
                    <FormSelection
                        id = {"category"}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        optionsList={category}
                        label = {"Category"}
                    />
                </FormSection>

                <FormSection col="2">
                    <FormLabel
                        label={"Description"}
                    />
                    <FormTextarea
                        id={description}
                        placeholder={"Transaction Description"}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </FormSection>

                <FormSection col="2" place="1">
                    <FormLabel label={"Currency"} />
                    <FormSelection
                    id={"currency"}
                    value={currency}
                    onChange={handleCurrency}
                    optionsList={currencyList}
                    label={"Currency"}
                    />
                </FormSection>

                <div className="col-span-2 sm:col-span-1">
                    <FormLabel label={"Amount"} />
                    <FormInput
                    id={"amount"}
                    placeholder={"Amount"}
                    type={"text"}
                    value={amount}
                    onChange={handleAmountChange}
                    />
                </div>

   
                
            
                <FormSection col="2">
                    <FormLabel
                        label={"Group"}
                    />
                    <FormSelection
                        id = {"group"}
                        value={selectedGroupOption}
                        onChange={handleGroupChange}
                        optionsList={groupList}
                        label = {"Group"}
                    />
                </FormSection>

                <FormSection col="2">
                <Button
                    color={"white"}
                    text={"Scan Receipt"}
                    //onClick={handleButtonClick}
                />
                </FormSection>

                
            </div>
            <CreateTransactionButton />
        </form>
    </div>

    );
}

export default AddTransactionPage;
