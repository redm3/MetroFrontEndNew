import React from 'react';
import './ProductCard.css';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product, onRemove = () => {} }) => {
  return (
    <div className="cart-card">
      <div className="cart-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="cart-details">
        <h3>{product.title}</h3>
        <p>Size: {product.size}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
      </div>
      {/* Move the cart-remove div outside of the cart-details div */}
      <div className="cart-remove">
        <IconButton
          aria-label="remove from cart"
          onClick={() => onRemove(product.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductCard;
