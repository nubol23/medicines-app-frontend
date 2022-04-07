import {useState} from 'react';


const useForm = (initialState = {}) => {

  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  }


  const handleInputChange = ({target}) => {

    setValues({
      ...values,
      [target.name]: target.value
    });

  }

  const handleSetAllValues = (data) => {
    setValues(vals => data)
  }

  return [values, handleInputChange, reset, handleSetAllValues];

}

export default useForm;