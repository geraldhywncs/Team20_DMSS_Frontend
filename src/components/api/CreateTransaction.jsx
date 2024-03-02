import React, { useState } from 'react';
import useCreateTransaction from '../../lib/expenses/CreateTransaction'; // Adjust the path accordingly
import FormSection from '../shared/FormSection';
import Button from '../shared/Button';

function CreateTransactionButton() {
  const [buttonClick, setButtonClick] = useState(false);
  const fetchData = useCreateTransaction();

  const handleButtonClick = async () => {
      await fetchData();
    
  };

  return (
    <div>
      <FormSection col="2">
        <div onClick={handleButtonClick}>
          <Button color={"blue"} text={"Create Transaction"} />
        </div>
      </FormSection>
    </div>
  );
}

export default CreateTransactionButton;