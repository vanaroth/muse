import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';

export const TestForm = () => {
  const initialValue = {
    nom: 'MyNameIs',
    gender: 'female',
    digits: [1, 7, 3, 8],
  };
  const { values, handleChange, handleSubmit } = useForm({ initialValue });
  console.log('initialValues', initialValue);
  console.log('TestForm', values);
  return (
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <div>
        <label>Nom</label>
        <input
          name="nom"
          autoComplete="off"
          value={values.nom}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
          checked={values.gender === 'male'}
        />{' '}
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
          checked={values.gender === 'female'}
        />{' '}
        Female
      </div>
      <div>
        <div>Favorite</div>
        <select
          name="digits"
          multiple
          onChange={handleChange}
          value={values.digits}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
            <option key={value} value={value}>
              Option {value}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
