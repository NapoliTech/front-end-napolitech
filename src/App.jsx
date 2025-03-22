import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CarosselComTexto } from './components/templates/CarosselComTexto';
import {Login} from './components/organisms/Login';
import { Cadastro } from './components/organisms/Cadastro';
import { Home } from './components/pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<CarosselComTexto><Login /></CarosselComTexto>} />
        <Route path="/cadastro" element={<CarosselComTexto><Cadastro /></CarosselComTexto>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;