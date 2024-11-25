import Navbar from "./Components/Navbar/Navbar"
import "./App.css"
import { UserProvider } from "./Components/Context/UserContext"
import AppRoutes from "./Components/Routes/AppRoutes"
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Payment from "./components/Stripe/Payment"
/* import StripeCheckout from "./components/Stripe/StripeCheckout" */

function App() {


  return (
    <div className="App">
       <UserProvider>
       {<Navbar/>}
       <AppRoutes />
       </UserProvider>

    </div>
  )
}

export default App

