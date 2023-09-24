import React from "react";
import { Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";


// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<SignIn />} />
        <Route path="/Sign-up" element={<SignUp />} />
        <Route path="/Signup" element={<SignUp />} />

        {/* Private Route */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/Home" element={<Home/>}/>
        </Route>

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
