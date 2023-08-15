import { ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import useInput, { InputValue } from "../hooks/useInput";

type InputFieldProps = {
  label: string;
  value: InputValue;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ label, value, onChange }: InputFieldProps) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="normal"
    />
  );
};

const Form = () => {
  const [todo, handleTodoChange] = useInput("");
  const [description, handleDescriptionChange] = useInput("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleTodoChange({
      target: { value: "" },
    } as ChangeEvent<HTMLInputElement>);
    handleDescriptionChange({
      target: { value: "" },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <InputField label="Todo" value={todo} onChange={handleTodoChange} />
        <InputField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </Box>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
