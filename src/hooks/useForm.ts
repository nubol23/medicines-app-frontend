import { useState } from "react";

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleSetAllValues = (data: any) => {
    setValues(data);
  };

  return [values, handleInputChange, reset, handleSetAllValues];
};

export default useForm;
