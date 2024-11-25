import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel } from '@mui/material';

const calculateTotalPrice = (products) => {
  return products.reduce((total, product) => total + product.price, 0);
};

const CheckoutContainer = ({ products }) => {
  const [agreement, setAgreement] = useState(false);
  const totalPrice = calculateTotalPrice(products);

  const handleAgreementChange = (event) => {
    setAgreement(event.target.checked);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h2>Sub Total: ${totalPrice.toFixed(2)}</h2>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreement}
              onChange={handleAgreementChange}
              name="agreement"
              color="primary"
            />
          }
          label="I agree that all sales are final: No Returns or Exchanges."
          style={{ alignSelf: 'flex-end' }}
        />
      </div>
      <Link to="/checkout" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          disabled={!agreement}
          sx={{
            backgroundColor: agreement ? 'black' : 'lightgrey',
            color: 'white',
            '&:hover': {
              backgroundColor: agreement ? 'black' : 'lightgrey',
            },
          }}
        >
          Checkout
        </Button>
      </Link>
      <footer style={{ textAlign: 'center', marginTop: '2rem' }}>
        <img
          src="https://cdn.brandfolder.io/KGT2DTA4/at/8vbr8k4mr5xjwk4hxq4t9vs/Stripe_wordmark_-_blurple.svg"
          alt="Stripe logo"
          style={{ width: '120px', height: 'auto' }}
        />
      </footer>
    </div>
  );
};

export default CheckoutContainer;
