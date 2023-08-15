import { ChangeEvent, useState } from "react";

export type InputValue = string;

const useInput = (
  initialValue: InputValue
): [InputValue, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<InputValue>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, handleChange];
};

export default useInput;
