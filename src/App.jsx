import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CarosselComTexto } from './components/templates/CarosselComTexto';
import {Login} from './components/organisms/Login';
import { Cadastro } from './components/organisms/Cadastro';
import { Home } from './components/pages/Home';
import Pedidos from './components/pages/pedidos';
import { RouterProvider } from  'react-router-dom'
import { routes } from './routes';

function App() {
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;