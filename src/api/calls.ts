export async function fetchTodos() {
  const response = await fetch("http://localhost:3000/todos");
  return response.json();
}

export async function fetchTodo(id: any) {
  const response = await fetch(`http://localhost:3000/todos/${id}`);
  return response.json();
}

export async function createTodo(newTodo: any) {
  const response = await fetch(`http://localhost:3000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  return response.json();
}

export async function updateTodo(updatedTodo: {
  id: string | undefined;
  title: string;
  description: string;
}): Promise<any> {
  const response = await fetch(
    `http://localhost:3000/todos/${updatedTodo.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }
  );
  return response.json();
}

export async function deleteTodo(id: any) {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
