import "./App.css";
//import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Home from "./components/Home";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";

function App() {
  //return <Login />;
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/data" element={<DataComponent />} /> */}
        <Route path="/" index element={<Login />} />
        <Route path="/home" index element={<Home />} />
        <Route path="/register" index element={<Register />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </BrowserRouter>
  );
}

export default App;
