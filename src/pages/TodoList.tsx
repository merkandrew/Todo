import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTodo, deleteTodo, fetchTodos } from "../api/calls";
import Form from "../components/Form";

function TodoList() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddMutation = (title: any, description: any) => {
    createTodoMutation.mutate({
      title,
      description,
    });
  };

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const navigate = useNavigate();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Form onSubmit={handleAddMutation} editValue={undefined} />
      </Grid>
      <Grid item xs="auto" sx={{ alignContent: "center" }}>
        {data.map(
          (todo: { id: string; title: string; description: string }) => (
            <Card key={todo.id}>
              <Grid
                onClick={() => navigate(`/todo/${todo.id}`)}
                sx={{ cursor: "pointer" }}
              >
                {todo.title}
              </Grid>
              <Grid>{todo.description}</Grid>
              <Grid>
                <Button onClick={() => navigate(`/todo/${todo.id}/edit`)}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
              </Grid>
            </Card>
          )
        )}
      </Grid>
    </Grid>
  );
}

export default TodoList;
