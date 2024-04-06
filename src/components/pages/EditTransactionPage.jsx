import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/transactionReducer';
import Button from "../shared/Button";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import FormTextarea from "../shared/FormTextarea";
import FormSection from "../shared/FormSection";
import EditTransaction from "../api/EditTransaction";
import GetCurrencySelection from "../api/GetCurrencySelection";
import {GetCategorySelection, addCategory, deleteCategory} from "../api/GetCategorySelection";
import GetGroupSelection from "../api/GetGroupSelection";
import SplitAmountInput from "../api/SplitAmountInput";
import IconSelection from "../api/IconSelection";
import GetRecurringFrequencySelection from "../api/GetRecurringFrequencySelection";
import ErrorMessage from "../shared/ErrorMessage";
import SuccessMessage from "../shared/SuccessMessage";
import LoadingMessage from "../shared/LoadingMessage";
import { getReceiptData } from '../api/ReceiptInfo';

const EditTransactionPage = ({ closePopup, userId, title, initialDescription, selectedGroup, receipt_id}) => {
    const dispatch = useDispatch();
    console.log('userId:',userId);
    const [transactionTitle, setTransactionTitle] = useState(title || '');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryValue, setCategoryValue] = useState("");
    const [currency, setCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState(initialDescription || '');
    const [selectedGroupOption, setGroupOption] = useState(selectedGroup || '');
    const [splitAmount, setSplitAmount] = useState('');
    const [selectedRecurringFrequency, setRecurringFrequency] = useState('');

    const [transactionTitleFieldColour, setTransactionTitleFieldColour] = useState('red');
    const [selectedCategoryFieldColour, setSelectedCategoryFieldColour] = useState('red');
    const [categoryMessage, setCategoryMessage] = useState('');
    const [categoryMessageType, setCategoryMessageType] = useState('');
    const [updateCategoryComponent, setUpdateCategoryComponent] = useState(false); 
    const [currencyFieldColour, setCurrencyFieldColour] = useState('red');
    const [amountFieldColour, setAmountFieldColour] = useState('red');
    const [selectedIconOption, setIconSelectedOption] = useState(1);
    const [selectedGroupOptionFieldColour, setSelectedGroupOptionFieldColour] = useState('gray');
    const [splitAmountFieldColour, setSplitAmountFieldColour] = useState('gray');
    const [selectedRecurringFrequencyFieldColour, setSelectedRecurringFrequencyFieldColour] = useState('gray');
    const [loadRecurringFrequencyField, setLoadRecurringFrequencyField] = useState(false);
    
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
    const [showLoadingMessage, setShowLoadingMessage] = useState(false); 

    const [addCategoryPopUpFailed, setAddCategoryPopUpFailed] = useState(false);
    const [addCategoryPopUpSuccessed, setAddCategoryPopUpSuccessed] = useState(false);

    const [transactionData, setTransactionData] = useState({
        transactionTitle: '',
        selectedCategory: '',
        from_currency: '',
        description: '',
        selectedIconOption: '',
        selectedGroupOption:  '',
        amount: '',
        splitAmount: '',
        selectedRecurringFrequency: ''
      });

   
    // useEffect (() => {
    //     if (receipt_id){
    //         getReceiptData(receipt_id)
    //         .then(response => {
    //             console.log("HSTHES");
    //             console.log(response)
    //             setDescription(response.description);
    //             setGroupOption(response.selectedGroupOption);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching description:', error);
    //         });
    //     }
    //     console.log(title, description, currency, amount, selectedIconOption, selectedGroupOption, selectedRecurringFrequency)
    // }, [receipt_id]);

    useEffect(() => {
        if (receipt_id) {
            getReceiptData(receipt_id)
                .then(response => {
                    const { title, description, group_id, currency_id, icon_id, cat_id, amount, splitAmount, recur_id } = response;
                    setTransactionData({
                        transactionTitle: title,
                        selectedCategory: cat_id,
                        from_currency: currency_id,
                        description: description,
                        selectedIconOption: icon_id,
                        selectedGroupOption: group_id,
                        amount: amount,
                        splitAmount: splitAmount,
                        selectedRecurringFrequency: recur_id
                    });
                })
                .catch(error => {
                    console.error('Error fetching receipt data:', error);
                });
        }
    }, [receipt_id]);

    // const getReceiptData = async (receiptId) => {
    //     const response = await fetch(`/expenses/read_receipt_by_id/${receiptId}`)
    //     const data = await response.json();
    //     return data;
    // }

    const handleTransactionDataChange = (key, value) => {
        setTransactionData(prevState => ({
          ...prevState,
          [key]: value

        }));
      };

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
        handleTransactionDataChange('selectedCategory', e.target.value);
        console.log(selectedCategory);
      };

      const handleAmountChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
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
        handleTransactionDataChange('description', e.target.value);
        console.log(description);
    };

    const handleCurrency = (e) => {
        if(e.target.value === ""){
            setCurrencyFieldColour("red");
        } else {
            setCurrencyFieldColour("gray");
        }
        setCurrency(e.target.value);
        handleTransactionDataChange('currency', e.target.value);
        console.log(currency);
    };

    const handleIconOptionChange = (e) => {
        setIconSelectedOption(e);
        console.log(selectedIconOption);
        handleTransactionDataChange('selectedIconOption', e);
    };

    const handleGroupChange = (e) => {
        setGroupOption(e.target.value);
        handleTransactionDataChange('selectedGroup', e.target.value);
        console.log(selectedGroupOption);
    };

    const handleSplitAmount = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setSplitAmount(e.target.value);
        handleTransactionDataChange('splitAmount');
        console.log(splitAmount);
    };

    const handleRecurringFrequencyChange = (e) => {
        setRecurringFrequency(e.target.value);
        handleTransactionDataChange('selectedRecurringFrequency', e.target.value);
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
            } else {
                setCategoryMessageType("error");
                setCategoryMessage(`Please try another category.`);
                setAddCategoryPopUpFailed(true);
            }
        });
    };
    
    const handleDeleteCategoryClick = (event)=>{
        event.preventDefault();
        setSelectedCategory('');
        setCategoryValue('');

        const data = {
            user_id: userId,
            category_id: selectedCategory
        };

        deleteCategory(data, (response)=>{
            if (response.status_code === 200) {
                setCategoryMessageType("success");
                setCategoryMessage(`Category deleted successfully: ${selectedCategory}`);
                setSelectedCategory(response.category_id);
                setUpdateCategoryComponent(prevState => !prevState);
            }  else {
                setCategoryMessageType("error");
                setCategoryMessage(`Failed to delete category.`);
            }

        });
    }

    const resetFormFields = () => {
        setTransactionData({
            transactionTitle: '',
            selectedCategory: '',
            currency: '',
            description: '',
            selectedIconOption: '',
            selectedGroupOption: '',
            splitAmount: '',
            selectedRecurringFrequency: ''
          });
          setShowErrorMessage(false);
          setShowSuccessMessage(false);
          setShowLoadingMessage(false);
    };

    

    const handleAddCategoryPopUpSuccessed = (event) => {
        setAddCategoryPopUpSuccessed(!addCategoryPopUpSuccessed);
    };

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

        {showErrorMessage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">   
            <ErrorMessage
                setShowErrorMessage={setShowErrorMessage}
                message={"Failed to edit transaction. Please check your inputs."}
            />
        </div>
        )}

        {showSuccessMessage && (
            <SuccessMessage
                setShowSuccessMessage={handleTransactionCreatedSucessButton}
                message={"Transaction edited successfully!"}
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
                    {/* <div id="categoryMessage" className={categoryMessageType === 'success' ? 'successMessage' : 'errorMessage'}>{categoryMessage}</div> */}
                
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
            <Button
                color={"white"}
                text={"Scan Receipt"}
                //onClick={handleButtonClick}
            />
        </FormSection>
        {/* onClick={handleEditTransaction} */}
        <EditTransaction 
            transactionData={transactionData} userId={userId} 
            setShowErrorMessage={setShowErrorMessage}
            setShowSuccessMessage={setShowSuccessMessage}
            setShowLoadingMessage={setShowLoadingMessage}
        />
        </div>
    </div>

    );
}


export default EditTransactionPage;
