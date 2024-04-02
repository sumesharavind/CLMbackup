import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
//import Header from './components/Header/Header';
//import AuthService from './components/AuthService'
import Home3 from "./components/Home3";

function App() {
  return (
    <>
      {/* for AuthService Purpose
   -------------------------------------------------------------
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
      
      <Routes>
          <Route path="/home3" element={<Home3 />} />
      </Routes>
      
  </BrowserRouter>*/}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home3" element={<Home3 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
