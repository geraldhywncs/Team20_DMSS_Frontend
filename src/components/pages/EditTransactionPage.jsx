import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTransaction,
  editTransaction,
  resetTransaction,
} from "../../redux/transactionReducer";
import Button from "../shared/Button";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import FormTextarea from "../shared/FormTextarea";
import FormSection from "../shared/FormSection";
import EditTransaction from "../api/EditTransaction";
import GetCurrencySelection from "../api/GetCurrencySelection";
import {
  GetCategorySelection,
  addCategory,
  deleteCategory,
} from "../api/GetCategorySelection";
import GetGroupSelection from "../api/GetGroupSelection";
import SplitAmountInput from "../api/SplitAmountInput";
import IconSelection from "../api/IconSelection";
import GetRecurringFrequencySelection from "../api/GetRecurringFrequencySelection";
import ErrorMessage from "../shared/ErrorMessage";
import SuccessMessage from "../shared/SuccessMessage";
import LoadingMessage from "../shared/LoadingMessage";
import { getReceiptData } from "../api/ReceiptInfo";

const EditTransactionPage = ({
  closePopup,
  userId,
  receipt_id,
  receiptData,
  shareAmtData,
  currencyData,
  setSuccessTransaction,
  receipt,
  setRefreshEditButton
}) => {
  const dispatch = useDispatch();
  const {
    title,
    cat_id,
    currencyid,
    shareAmounts,
    icon_id,
    splitAmounts,
    descriptions,
    group_id,
    recur_id,
    created_datetime,
    created_user_id,
    status_code,
  } = receiptData;
  console.log("receiptData",receiptData);
  console.log("receipt",receipt);
  // console.log("title",title)
  // console.log("cat_id",cat_id)
  // console.log("currencyid",currencyid)
  // console.log("shareAmounts",shareAmounts)
  // console.log("icon_id",icon_id)
  // console.log("splitAmounts",splitAmounts)
  // console.log("descriptions",descriptions)
  // console.log("group_id",group_id)
  // console.log("recur_id",recur_id)
  // console.log("created_datetime",created_datetime)
  // console.log("created_user_id",created_user_id)
  // console.log("status_code",status_code)

  // console.log('EditTransactionPage', receiptData);
  const [transactionTitle, setTransactionTitle] = useState("");
  // console.log("title::", title);
  const [selectedCategory, setSelectedCategory] = useState("");
  // console.log("catID::", cat_id)
  const [currency, setCurrency] = useState(2);
  // console.log("currID::", currencyData)
  const [amount, setAmount] = useState("");
  
  const [selectedIconOption, setIconSelectedOption] = useState(1);
  // console.log("iconID::", icon_id)
  const [splitAmount, setSplitAmount] = useState(
    ""
  );
  // console.log("Splitamounts::", splitAmounts)
  const [description, setDescription] = useState("");
  // console.log("descriptions::", description)
  const [selectedGroupOption, setGroupOption] = useState("");
  // console.log("groupID::", group_id)
  const [selectedRecurringFrequency, setRecurringFrequency] = useState("");
  // console.log("recID::", recur_id);

  useEffect(() => {
    // Only set the amount if receipt.total_amount exists
    if (receipt && receipt.total_amount !== undefined) {
      setAmount(receipt.total_amount);
      setIconSelectedOption(receipt.icon_id);
      setDescription(receipt.description);
      setGroupOption(receipt?.group_id || "");
      setRecurringFrequency(receipt?.recur_id || "");
      setSelectedCategory(receipt.cat_id);
      setTransactionTitle(receipt.title);
      console.log("selectedGroupOption:", selectedGroupOption);
    }
  }, [receipt]);

  const [categoryValue, setCategoryValue] = useState("");
  const [transactionTitleFieldColour, setTransactionTitleFieldColour] =
    useState("gray");
  const [selectedCategoryFieldColour, setSelectedCategoryFieldColour] =
    useState("gray");
  const [currencyFieldColour, setCurrencyFieldColour] = useState("gray");
  const [amountFieldColour, setAmountFieldColour] = useState("gray");
  const [splitAmountFieldColour, setSplitAmountFieldColour] = useState("gray");
  const [selectedGroupOptionFieldColour, setSelectedGroupOptionFieldColour] =
    useState("gray");
  const [
    selectedRecurringFrequencyFieldColour,
    setSelectedRecurringFrequencyFieldColour,
  ] = useState("gray");
  const [loadRecurringFrequencyField, setLoadRecurringFrequencyField] =
    useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  const [addCategoryPopUpFailed, setAddCategoryPopUpFailed] = useState(false);
  const [addCategoryPopUpSuccessed, setAddCategoryPopUpSuccessed] =
    useState(false);

  const [categoryMessage, setCategoryMessage] = useState("");
  const [updateCategoryComponent, setUpdateCategoryComponent] = useState(false);

  // useEffect(() => {
  //   setShowLoadingMessage(true);
  //   if (receipt_id) {
  //     getReceiptData(receipt_id)
  //       .then((response) => {
  //         // console.log('VALUES UPDATED')
  //         const {
  //           title,
  //           description,
  //           group_id,
  //           currency_id,
  //           icon_id,
  //           cat_id,
  //           amount,
  //           splitAmount,
  //           recur_id,
  //         } = response;
  //         // console.log('receiptData')
  //         // console.log(response);
  //         console.log("hello:",response);
  //         setTransactionTitle(title);
  //         setSelectedCategory(cat_id);
  //         setCurrency(response.expenses[0].currency_id);
  //         // setAmount(response.expenses[0].share_amount);
  //         setAmount(receipt.total_amount)
  //         // setSplitAmount(splitAmount);
  //         setDescription(description);
  //         setGroupOption(group_id);
  //         setIconSelectedOption(icon_id);
  //         setRecurringFrequency(recur_id);
  //         setShowLoadingMessage(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching receipt data:", error);
  //       });
  //   }
  // }, [receipt_id]);

  const handleTransactionTitle = (e) => {
    if (e.target.value === "") {
      setTransactionTitleFieldColour("red");
    } else {
      setTransactionTitleFieldColour("gray");
    }
    setTransactionTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "") {
      setSelectedCategoryFieldColour("red");
    } else {
      setSelectedCategoryFieldColour("gray");
    }
    setSelectedCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
    if (e.target.value === "") {
      setAmountFieldColour("red");
    } else {
      setAmountFieldColour("gray");
    }
    setAmount(numericValue);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCurrency = (e) => {
    if (e.target.value === "") {
      setCurrencyFieldColour("red");
    } else {
      setCurrencyFieldColour("gray");
    }
    setCurrency(e.target.value);
  };

  const handleIconOptionChange = (e) => {
    setIconSelectedOption(e);
  };

  const handleGroupChange = (e) => {
    setGroupOption(e.target.value);
  };

  const handleSplitAmount = (e) => {
    setSplitAmount(e.target.value);
  };

  const handleRecurringFrequencyChange = (e) => {
    setRecurringFrequency(e.target.value);
  };

  const handleAddCategoryClick = (event) => {
    event.preventDefault();
    setSelectedCategory("");
    setCategoryValue("");

    const data = {
      user_id: userId,
      category_name: categoryValue,
    };

    addCategory(data, (response) => {
      if (response.status_code === 200) {
        setCategoryMessage(`Category added successfully: ${categoryValue}`);
        setSelectedCategory(response.category_id);
        setUpdateCategoryComponent((prevState) => !prevState);
        setAddCategoryPopUpSuccessed(true);
      } else {
        setCategoryMessage(`Please try another category.`);
        setAddCategoryPopUpFailed(true);
      }
    });
  };

  const handleDeleteCategoryClick = (event) => {
    event.preventDefault();
    setSelectedCategory("");
    setCategoryValue("");

    const data = {
      user_id: userId,
      category_id: selectedCategory,
    };

    deleteCategory(data, (response) => {
      if (response.status_code === 200) {
        setCategoryMessage(
          `Category deleted successfully: ${selectedCategory}`
        );
        setSelectedCategory(response.category_id);
        setUpdateCategoryComponent((prevState) => !prevState);
      } else {
        setCategoryMessage(`Failed to delete category.`);
      }
    });
  };

  const resetFormFields = () => {
    setTransactionTitle(receiptData?.title || "");
    setSelectedCategory(receiptData?.cat_id || "");
    setCategoryValue("");
    setCurrency(receiptData?.currency_id || "");
    setAmount(receiptData?.amount || "");
    setSplitAmount(receiptData?.splitAmount || "");
    setDescription(receiptData?.description || "");
    setGroupOption(receiptData?.group_id || "");
    setIconSelectedOption(receiptData?.icon_id || 1);
    setRecurringFrequency(receiptData?.recur_id || "");

    setTransactionTitleFieldColour("gray");
    setSelectedCategoryFieldColour("gray");
    setCurrencyFieldColour("gray");
    setAmountFieldColour("gray");
    setSplitAmountFieldColour("gray");
    setSelectedGroupOptionFieldColour("gray");
    setSelectedRecurringFrequencyFieldColour("gray");

    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    setShowLoadingMessage(false);
    setAddCategoryPopUpFailed(false);
    setAddCategoryPopUpSuccessed(false);
  };

  const handleAddCategoryPopUpSuccessed = (event) => {
    setAddCategoryPopUpSuccessed(!addCategoryPopUpSuccessed);
  };

  const handleTransactionCreatedSucessButton = () => {
    setShowSuccessMessage(false);
    closePopup();
    resetFormFields();
    setSuccessTransaction(true);
    setRefreshEditButton(false);
    dispatch(editTransaction());
  };

  return (
    <div className="relative bg-white rounded-lg shadow p-4 overflow-y-auto">
      <div className="flex items-center justify-between rounded-t dark:border-gray-600">
        <button
          type="button"
          className="text-black bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={closePopup}
        >
          <span className="material-icons">close</span>
        </button>
      </div>

      {showErrorMessage && (
        <div className="bg-white p-8 rounded-md shadow-md text-center text-red-500 mb-4 font-large font-bold">
          <ErrorMessage
            setShowErrorMessage={setShowErrorMessage}
            message={"Failed to edit transaction. Please check your inputs."}
          />
        </div>
      )}

      {showSuccessMessage && (
        <div className="bg-white p-8 rounded-md shadow-md text-center text-green-500 mb-4 font-large font-bold">
          <SuccessMessage
            setShowSuccessMessage={handleTransactionCreatedSucessButton}
            message={"Transaction edited successfully!"}
          />
        </div>
      )}
      {showLoadingMessage && <LoadingMessage message={"Loading"} />}

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

      <form className="p-7 md:p-7">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <IconSelection
            selectedOption={selectedIconOption}
            handleIconOptionChange={handleIconOptionChange}
          />

          <FormSection col="2">
            <FormLabel label={"Title (Required)"} />
            <FormInput
              id={"title"}
              placeholder={"Title"}
              type={"text"}
              value={transactionTitle}
              onChange={handleTransactionTitle}
              fieldColour={transactionTitleFieldColour}
            />
          </FormSection>

          <GetCategorySelection
            key={selectedCategory}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            fieldColour={selectedCategoryFieldColour}
            userId={userId}
            categoryAdded={updateCategoryComponent}
          />

          <FormSection col="2" place="1">
            <FormInput
              id={"addCategory"}
              placeholder={"Enter Category"}
              type={"text"}
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              fieldColour={"gray"}
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
            <FormLabel label={"Description"} />
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
            fieldColour={currencyFieldColour}
          />

          <FormSection col="2" place="1">
            <FormLabel label={"Amount (Required)"} />
            <FormInput
              id={"amount"}
              placeholder={"Amount"}
              type={"text"}
              value={amount}
              onChange={handleAmountChange}
              fieldColour={amountFieldColour}
            />
          </FormSection>

          <GetGroupSelection
            handleGroupChange={handleGroupChange}
            selectedGroupOption={selectedGroupOption}
            fieldColour={selectedGroupOptionFieldColour}
            userId={userId}
          />

          <SplitAmountInput
            setSplitAmount={setSplitAmount}
            splitAmount={splitAmount}
            handleSplitAmount={handleSplitAmount}
            selectedGroupOption={selectedGroupOption}
            amount={amount}
            fieldColour={splitAmountFieldColour}
            receipt_id={receipt_id}
            setShowLoadingMessage={setShowLoadingMessage}
            receipt={receipt}
          />

          <GetRecurringFrequencySelection
            selectedRecurringFrequency={selectedRecurringFrequency}
            handleRecurringFrequencyChange={handleRecurringFrequencyChange}
            fieldColour={selectedRecurringFrequencyFieldColour}
          />

          <div className="col-span-2 sm:col-span-1"></div>
        </div>
      </form>
      <div className="px-7 md:px-7 py-0 grid gap-4 mb-4">
        <FormSection>
          <Button color={"white"} text={"Scan Receipt"} />
        </FormSection>

        <EditTransaction
          transactionTitle={transactionTitle}
          selectedCategory={selectedCategory}
          currency={currency}
          shareAmtData={amount}
          amount={amount}
          splitAmount={splitAmount}
          description={description}
          selectedIconOption={selectedIconOption}
          selectedGroupOption={selectedGroupOption}
          selectedRecurringFrequency={selectedRecurringFrequency}
          receiptData={receiptData}
          setShowErrorMessage={setShowErrorMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          setShowLoadingMessage={setShowLoadingMessage}
          receipt_id={receipt_id}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default EditTransactionPage;
