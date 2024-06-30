import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./Components/product/ShowProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/product/ProductDetail";
import Navbar from "./Components/Navbar";
import SearchProduct from "./Components/product/SearchProduct";
import Register from "./Components/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/user/Login";
import Profile from "./Components/user/Profile";
import Cart from "./Components/Cart";
import Address from "./Components/Address";
import Checkout from "./Components/Checkout";
import OrderConfirmation from "./Components/OrderConfirmation";

function App() {
  //const { prod } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct></ShowProduct>}></Route>
        <Route
          path="/product/search/:term"
          element={<SearchProduct></SearchProduct>}
        ></Route>
        <Route
          path="/product/:id"
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/shipping" element={<Address></Address>}></Route>
        <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        <Route path="/orderconfirmation" element={<OrderConfirmation></OrderConfirmation>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
