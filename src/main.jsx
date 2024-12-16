import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PokedexPage from "./pages/PokedexPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizPage from "./pages/QuizPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokedex",
    element: <PokedexPage />,
  },
  {
    path: "/pokemon-quiz",
    element: <QuizPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
