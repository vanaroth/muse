import { useState } from 'react';

export const useForm = ({ initialValue = {} } = {}) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (e) => {
    const { type, name } = e.target;
    const getValue = () => {
      if (type === 'checkbox') {
        return e.target.checkbox;
      } else if (type === 'select-multiple') {
        return Array.from(e.target.selectedOptions).map((o) => o.value);
      }
      return e.target.value;
    };

    const value = getValue();
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (onSubmit) => {
    return (e) => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      onSubmit(values, e);
    };
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
  };
};
