import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "../../Pages/Home/Home";
import Store from "../../Pages/Store/Store";
import ProductDetailsPage from "../../Pages/Products/ProductDetailsPage";
import Cart from "../../Pages/Cart/Cart"
import Checkout from "../../Pages/Checkout/Checkout";
import Login from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register";
import ProtectedRoute from "../Routes/ProtectedRoutes";
import Profile from "../../Pages/Profile/Profile";
import Admin from "../../Pages/Admin/Admin";
import AddressForm from "../../Pages/Checkout/AddressForm";
import Payment from "../../Services/Stripe/Payment";
import Completion from "../../Services/Stripe/Completion";

/*

/* import Pay from "../pages/Pay"; 
import AddressForm from "../pages/checkout/AddressForm";


import Payment from "../components/Stripe/Payment";

import Completion from "../components/Stripe/Completion";

import Admin from "../pages/admin/admin";

*/
function AppRoutes(props) {
  const [orderData, setOrderData] = useState({});
  /* const [totalPrice, setTotalPrice] = useState(0); */
  const orderwrapper = (order) => {
    console.log(order)
    setOrderData(order)
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login {...props} />} />
        <Route path="/checkout" element={<Checkout orderData={orderData} setOrderData={orderwrapper} /* setTotalPrice={setTotalPrice} */ />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute adminOnly={false}><Profile /></ProtectedRoute>} />
        <Route path="/Admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
        
        <Route path="/payment" element={<Payment orderData={orderData} />} />
        <Route path="/checkout" element={<Checkout orderData={orderData} setOrderData={orderwrapper} />} />
        <Route path="/completion" element={<Completion />} />
          {/*
        
        
        
    
        
        
        
        */}
      
    </Routes>
  );
}

export default AppRoutes;