import "./index.css";
import React from "react";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import ErrorPage from "./error-page.tsx";
import { store } from "./redux/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Add from "./routes/add.tsx";
import Edit from "./routes/edit.tsx";
import Delete from "./routes/delete.tsx";
import Song from "./routes/song.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "/add", element: <Add /> },
      { path: "/:id", element: <Song /> },
      { path: "/:id/edit", element: <Edit /> },
      { path: "/:id/delete", element: <Delete /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
