import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import { fetchTodo, updateTodo } from "../api/calls";

const EditTodo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodo(id),
  });

  const mutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", id]);
      navigate("/");
    },
  });

  const [title, setTitle] = useState(data?.title ?? "");
  const [description, setDescription] = useState(data?.description ?? "");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ id, title, description });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            margin="normal"
          />
          <TextField
            variant="outlined"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditTodo;
