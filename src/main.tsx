import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditTodo from "./pages/EditTodo";
import TodoList from "./pages/TodoList";
import TodoDetails from "./pages/TodoDetails";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
  {
    path: "/todo/:id",
    element: <TodoDetails />,
  },
  {
    path: "/todo/:id/edit",
    element: <EditTodo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
