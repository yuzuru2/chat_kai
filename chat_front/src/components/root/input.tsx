import React from 'react';
import { useFormContext } from 'react-hook-form';

export const Input = () => {
  const { register } = useFormContext();

  return (
    <>
      <input
        name="name"
        className="form-control"
        placeholder="ニックネームを入力"
        aria-describedby="basic-addon1"
        maxLength={15}
        required
        ref={register({
          required: true,
          maxLength: 15,
        })}
      />
    </>
  );
};
