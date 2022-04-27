import React, { useState } from "react";

const useForm = <T>(
  initialState: T
): [
  T,
  React.ChangeEventHandler<HTMLInputElement> &
    React.ChangeEventHandler<HTMLSelectElement>,
  Function,
  Function
] => {
  const [values, setValues] = useState<T>(initialState);

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
