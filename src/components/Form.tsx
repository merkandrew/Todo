import { ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import useInput, { InputValue } from "../hooks/useInput";

type InputFieldProps = {
  label: string;
  value: InputValue;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type FormProps = {
  onSubmit: (title: string, description: string) => void;
  editValue: any;
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

const Form = ({ onSubmit, editValue }: FormProps) => {
  const [title, handleTodoChange] = useInput(editValue?.title || "");
  const [description, handleDescriptionChange] = useInput(
    editValue?.description || ""
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, description);
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
        <InputField label="Todo" value={title} onChange={handleTodoChange} />
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
