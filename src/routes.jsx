import { createBrowserRouter } from "react-router-dom";
import { CarosselComTexto } from "./components/templates/CarosselComTexto";
import { Login } from "./components/organisms/Login";
import { Cadastro } from "./components/organisms/Cadastro";
import { Home } from "./components/pages/Home";
import Pedidos from "./components/pages/pedidos";
import Atendimento from "./components/pages/Atendimento";

export const routes = createBrowserRouter([
  {
    path: "/teste",
    element: <h1> teste </h1>,
  },
  {
    path: "/Login",
    element: (
      <CarosselComTexto>
        <Login />
      </CarosselComTexto>
    ),
  },
  {
    path: "/cadastro",
    element: (
      <CarosselComTexto>
        <Cadastro />
      </CarosselComTexto>
    ),
  },
  { path: "/", element: <Home /> },
  { path: "/pedidos", element: <Pedidos /> },
  { path: "/atendimento", element: <Atendimento /> },
  { path: "/", element: <Atendimento /> },

]);
