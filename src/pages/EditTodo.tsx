interface EditTodoProps {
  id: string;
}
const EditTodo = ({ id }: EditTodoProps) => {
  return <div>EditTodo {id}</div>;
};

export default EditTodo;
