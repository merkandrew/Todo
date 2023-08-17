import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/base";
import { fetchTodo } from "../api/calls";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodo(id),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      <Button onClick={() => navigate("/")}>Back</Button>
      <h1>{data.id}</h1>
      <h2>{data.title}</h2>
    </>
  );
};

export default TodoDetails;
