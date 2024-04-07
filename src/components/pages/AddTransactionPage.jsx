import React, {useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/transactionReducer';
import Button from "../shared/Button";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import FormTextarea from "../shared/FormTextarea";
import FormSection from "../shared/FormSection";
import CreateTransactionButton from "../api/CreateTransaction";
import GetCurrencySelection from "../api/GetCurrencySelection";
import {GetCategorySelection, addCategory, deleteCategory} from "../api/GetCategorySelection";
import GetGroupSelection from "../api/GetGroupSelection";
import SplitAmountInput from "../api/SplitAmountInput";
import IconSelection from "../api/IconSelection";
import GetRecurringFrequencySelection from "../api/GetRecurringFrequencySelection";
import ErrorMessage from "../shared/ErrorMessage";
import SuccessMessage from "../shared/SuccessMessage";
import LoadingMessage from "../shared/LoadingMessage";
import ScanReceipt from '../api/ScanReceipt';


const AddTransactionPage = ({ closePopup, userId }) => {
    const dispatch = useDispatch();

    const [transactionTitle, setTransactionTitle] = useState('');
    const [transactionTitleFieldColour, setTransactionTitleFieldColour] = useState('red');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryFieldColour, setSelectedCategoryFieldColour] = useState('red');
    const [categoryMessage, setCategoryMessage] = useState('');
    const [categoryMessageType, setCategoryMessageType] = useState('');
    const [categoryValue, setCategoryValue] = useState("");
    const [updateCategoryComponent, setUpdateCategoryComponent] = useState(false); 
    
    const [currency, setCurrency] = useState('');
    const [currencyFieldColour, setCurrencyFieldColour] = useState('red');

    const [amount, setAmount] = useState('');
    const [amountFieldColour, setAmountFieldColour] = useState('red');
    
    const [description, setDescription] = useState('');
    const [selectedIconOption, setIconSelectedOption] = useState(1);
    

    const [selectedGroupOption, setGroupOption] = useState('');
    const [selectedGroupOptionFieldColour, setSelectedGroupOptionFieldColour] = useState('gray');
    
    const [splitAmount, setSplitAmount] = useState('');
    const [splitAmountFieldColour, setSplitAmountFieldColour] = useState('gray');

    const [selectedRecurringFrequency, setRecurringFrequency] = useState('');
    const [selectedRecurringFrequencyFieldColour, setSelectedRecurringFrequencyFieldColour] = useState('gray');
    const [loadRecurringFrequencyField, setLoadRecurringFrequencyField] = useState(false);

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
    const [showLoadingMessage, setShowLoadingMessage] = useState(false); 

    const [addCategoryPopUpFailed, setAddCategoryPopUpFailed] = useState(false);
    const [addCategoryPopUpSuccessed, setAddCategoryPopUpSuccessed] = useState(false);

    const [deleteCategoryPopUpSuccessed, setDeleteCategoryPopUpSuccessed] = useState(false);
    const [deleteCategoryPopUpFailed, setDeleteCategoryPopUpFailed] = useState(false);

    const [categories, setUpdatedCategories] = useState([]);

    const [successScanReceiptMessage, setSuccessScanReceiptMessage] = useState(false);
    const [errorScanReceiptMessage, setErrorScanReceiptMessage] = useState(false);


    useEffect(() => {
        console.log(selectedCategory);
    }, [selectedCategory]);
    
    const handleTransactionTitle = (e) => {
        if(e.target.value === ""){
            setTransactionTitleFieldColour("red");
        } else {
            setTransactionTitleFieldColour("gray");
        }
        setTransactionTitle(e.target.value);
        console.log(transactionTitle);
    };

    const handleCategoryChange = (e) => {
        if(e.target.value === ""){
            setSelectedCategoryFieldColour("red");
        } else {
            setSelectedCategoryFieldColour("gray");
        }
        setSelectedCategory(e.target.value);
    };

      const handleAmountChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9.]/g, '');
        if(e.target.value === ""){
            setAmountFieldColour("red");
        } else {
            setAmountFieldColour("gray");
        }
        setAmount(numericValue);
        console.log(amount);
      };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        console.log(description);
    };

    const handleCurrency = (e) => {
        if(e.target.value === ""){
            setCurrencyFieldColour("red");
        } else {
            setCurrencyFieldColour("gray");
        }
        setCurrency(e.target.value);
        console.log(currency);
    };

    const handleIconOptionChange = (e) => {
        setIconSelectedOption(e);
        console.log(selectedIconOption);
    };

    const handleGroupChange = (e) => {
        setGroupOption(e.target.value);
        console.log(selectedGroupOption);
    };

    const handleSplitAmount = (e) => {
        setSplitAmount(e.target.value);
        console.log(splitAmount);
    };

    const handleRecurringFrequencyChange = (e) => {
        setRecurringFrequency(e.target.value);
        console.log(selectedRecurringFrequency);
    };

    const handleTransactionCreatedSucessButton  = (e) => {
        setShowSuccessMessage(false);
        resetFormFields();
        closePopup();
        dispatch(addTransaction());
    };

    /*Manage Category*/
    const handleCategoryInputChange = (event) => {
        setCategoryValue(event.target.value);
    };

    const handleAddCategoryClick = (event) => {
        event.preventDefault();
        setSelectedCategory('');
        setCategoryValue('');

        const data = {
            user_id: userId,
            category_name: categoryValue
        };
    
        addCategory(data, (response) => {
            if (response.status_code === 200) {
                setCategoryMessageType("success");
                setCategoryMessage(`Category added successfully: ${categoryValue}`);
                setSelectedCategory(response.category_id);
                setUpdateCategoryComponent(prevState => !prevState);
                setAddCategoryPopUpSuccessed(true);
                setSelectedCategoryFieldColour('gray')
            } else {
                setCategoryMessageType("error");
                setCategoryMessage(`Please try another category.`);
                setAddCategoryPopUpFailed(true);
            }
        });
        
    };
    
    const handleDeleteCategoryClick = (event) => {
        event.preventDefault();
        setSelectedCategory('');
        setCategoryValue('');
    
        const data = {
            user_id: userId,
            category_id: selectedCategory
        };
    
        deleteCategory(data, (response) => {
            if (response.status_code === 200) {
                const updatedCategories = categories.filter(category => category.id !== selectedCategory);
                setUpdatedCategories(updatedCategories);
                setCategoryMessageType("success");
                setCategoryMessage(`Category deleted successfully!`);
                
                setUpdateCategoryComponent(prevState => !prevState);
                setDeleteCategoryPopUpSuccessed(true);
                setSelectedCategory('');
                setSelectedCategoryFieldColour('red')
            } else {
                setCategoryMessageType("error");
                setCategoryMessage(`Failed to delete category.`);
                setDeleteCategoryPopUpFailed(true);
            }
        });

        
    };
    

    const resetFormFields = () => {
        setTransactionTitle('');
        setTransactionTitleFieldColour('red');
    
        setSelectedCategory('');
        setSelectedCategoryFieldColour('red');
    
        setCurrency('');
        setCurrencyFieldColour('red');
    
        setAmount('');
        setAmountFieldColour('red');
    
        setDescription('');
        setIconSelectedOption(1);
    
        setGroupOption('');
        setSelectedGroupOptionFieldColour('gray');
    
        setSplitAmount('');
        setSplitAmountFieldColour('gray');
    
        setRecurringFrequency('');
        setSelectedRecurringFrequencyFieldColour('gray');
        setLoadRecurringFrequencyField(false);
    
        setShowErrorMessage(false);
        setShowSuccessMessage(false);
        setShowLoadingMessage(false);
    };

    const handleAddCategoryPopUpSuccessed = (event) => {
        setAddCategoryPopUpSuccessed(!addCategoryPopUpSuccessed);
    };
    
    const handleDeleteCategoryPopUpSuccessed = (event) => {
        setDeleteCategoryPopUpSuccessed(!deleteCategoryPopUpSuccessed);
    };

    const handleScannedSuccessMessage =() => {
        setSuccessScanReceiptMessage(false);
    };

    const handleScannedErrorMessage =() => {
        setErrorScanReceiptMessage(false);
    }

    const handleClosePopUp =() => {
        closePopup()
        resetFormFields();
    }

    return (
        <div className="relative bg-white rounded-lg shadow p-4 overflow-y-auto">
        <div className="flex items-center justify-between rounded-t dark:border-gray-600">
            <button
                type="button"
                className="text-black bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClosePopUp}
            >
                <span className="material-icons">
                    close
                </span>
            </button>

        </div>

        {showErrorMessage && (
            <ErrorMessage
                setShowErrorMessage={setShowErrorMessage}
                message={"Failed to create transaction. Please check your inputs."}
            />
        )}

        {showSuccessMessage && (
            <SuccessMessage
                setShowSuccessMessage={handleTransactionCreatedSucessButton}
                message={"Transaction created successfully!"}
            />
        )}
        {showLoadingMessage && (
            <LoadingMessage message={"Loading"} />
        )}

        {addCategoryPopUpSuccessed && (
            <SuccessMessage
                setShowSuccessMessage={handleAddCategoryPopUpSuccessed}
                message={categoryMessage}
            />
        )}

        {addCategoryPopUpFailed && (
            <ErrorMessage
                setShowErrorMessage={setAddCategoryPopUpFailed}
                message={categoryMessage}
            />
        )}

        {deleteCategoryPopUpSuccessed && (
            <SuccessMessage
                setShowSuccessMessage={handleDeleteCategoryPopUpSuccessed}
                message={categoryMessage}
            />
        )}

        {deleteCategoryPopUpFailed && (
            <ErrorMessage
                setShowErrorMessage={setDeleteCategoryPopUpFailed}
                message={categoryMessage}
            />
        )}

        {successScanReceiptMessage && (
            <SuccessMessage
                setShowSuccessMessage={handleScannedSuccessMessage}
                message={"Receipt scanned successfully"}
            />
        )}

        {errorScanReceiptMessage && (
            <ErrorMessage
                setShowErrorMessage={handleScannedErrorMessage}
                message={"Unable to detect amount. Please enter manually."}
            />
        )}
        
        <form class="p-7 md:p-7">
            <div className="grid grid-cols-2 gap-4 mb-4">

                <IconSelection
                    selectedOption = {selectedIconOption}
                    handleIconOptionChange = {handleIconOptionChange}
                />
                
                <FormSection col="2">
                    <FormLabel
                        label={"Title (Required)"}
                    />
                    <FormInput
                        id = {"title"}
                        placeholder = {"Title"}
                        type = {"text"}
                        value={transactionTitle}
                        onChange={handleTransactionTitle}
                        fieldColour = {transactionTitleFieldColour}
                    />
                </FormSection>

                <GetCategorySelection 
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                    fieldColour = {selectedCategoryFieldColour}
                    userId={userId}
                    categoryAdded= {updateCategoryComponent}
                />

                <FormSection col="2" place="1">
                    <FormInput
                        id = {"addCategory"}
                        placeholder = {"Enter Category"}
                        type = {"text"}
                        value={categoryValue}
                        onChange={handleCategoryInputChange}
                        fieldColour = {"gray"}
                    />
                </FormSection>

                <FormSection col="2" place="1">
                    <Button
                        color="addCategory"
                        text="Add Category"
                        onClick={handleAddCategoryClick} 
                    />

                    {selectedCategory && (
                        <Button
                            color="deleteCategory"
                            text="Delete Category"
                            onClick={handleDeleteCategoryClick}
                            disabled={!selectedCategory}
                        />
                    )}
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

                <GetCurrencySelection 
                    handleCurrency={handleCurrency}
                    currency={currency}
                    fieldColour = {currencyFieldColour}
                />

                <FormSection col="2" place="1">
                
                    <FormLabel label={"Amount (Required)"} />
                    <FormInput
                    id={"amount"}
                    placeholder={"Amount"}
                    type={"text"}
                    value={amount}
                    onChange={handleAmountChange}
                    fieldColour = {amountFieldColour}
                    />
                </FormSection>
                
                <GetGroupSelection 
                    handleGroupChange={handleGroupChange}
                    selectedGroupOption={selectedGroupOption}
                    fieldColour = {selectedGroupOptionFieldColour}
                    userId={userId}
                />

                <SplitAmountInput 
                    setSplitAmount={setSplitAmount}
                    splitAmount={splitAmount}
                    handleSplitAmount={handleSplitAmount}
                    selectedGroupOption={selectedGroupOption}
                    amount={amount}
                    fieldColour = {splitAmountFieldColour}
                />

                <GetRecurringFrequencySelection
                    selectedRecurringFrequency = {selectedRecurringFrequency}
                    handleRecurringFrequencyChange = {handleRecurringFrequencyChange}
                    fieldColour = {selectedRecurringFrequencyFieldColour}
                />

                <div className="col-span-2 sm:col-span-1"></div>

            </div>
            
        </form>
        <div className="px-7 md:px-7 py-0 grid gap-4 mb-4">
        <FormSection>
            <ScanReceipt
                color={"white"}
                text={"Scan Receipt"}
                setShowLoadingMessage = {setShowLoadingMessage}
                setAmount = {setAmount}
                setSuccessScanReceiptMessage = {setSuccessScanReceiptMessage}
                setErrorScanReceiptMessage = {setErrorScanReceiptMessage}
            />
        </FormSection>
        <CreateTransactionButton 
            transactionTitle = {transactionTitle}
            selectedCategory = {selectedCategory}
            currency = {currency}
            description = {description}
            selectedIconOption = {selectedIconOption}
            selectedGroupOption = {selectedGroupOption}
            splitAmount = {splitAmount}
            selectedRecurringFrequency  = {selectedRecurringFrequency}
            userId = {userId}
            setShowErrorMessage = {setShowErrorMessage}
            setShowSuccessMessage = {setShowSuccessMessage}
            setShowLoadingMessage = {setShowLoadingMessage}
        />
        </div>
    </div>

    );
}


export default AddTransactionPage;
