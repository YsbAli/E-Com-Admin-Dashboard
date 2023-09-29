import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import SignUp from "./Components/Signup";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./pages/Login";

import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProduct from "./pages/Update";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/update-products/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Components</h1>} />
            <Route path="/profile" element={<h1>Profile Components</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
