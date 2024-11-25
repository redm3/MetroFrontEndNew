import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import "./StripeCheckoutForm.css";

export default function StripeCheckoutForm({orderData}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
  
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    console.log("Order data before API call:", orderData); // Add this line to debug orderData

    const modifiedOrderData = {
      userId: orderData._id,
      products: orderData.products.map((product) => ({
        /* productId: product.id, */ // Use product.id instead of product._id
        productId: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: product.quantity,
        size:product.size,
        gender: product.gender,
        category: product.category,
        description: product.description,
      })),
      orderTotal: orderData.totalPrice,
      shippingAddress: {
        firstName: orderData.name.firstname,
        lastName: orderData.name.lastname,
        addressLine1: `${orderData.address.number} ${orderData.address.street}`,
        addressLine2: "",
        city: orderData.address.city,
        state: "",
        postalCode: orderData.address.zipcode,
        country: "USA", // Replace this with the appropriate country code
      },
    };
  
    axios
      .post("https://metro-back-end.vercel.app/api/orders/create", modifiedOrderData)
      .then((rsp) => {
        console.log(rsp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
  
    setIsProcessing(false);
  };

  return (
    <div className="checkout-form-container">
      
    <form id="payment-form" onSubmit={handleSubmit}>
    <h1>Metro Stripe Pay</h1>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </div>
  );
}