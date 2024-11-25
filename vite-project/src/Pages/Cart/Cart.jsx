import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CheckoutContainer from '../Cart/CheckoutContainer';
import './Cart.css';

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('cart');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  };

  const totalItems = products.reduce((total, product) => total + product.quantity, 0);

  return (
    <div className="Cart">
      {products.length === 0 ? (
        <h5 className="empty-cart-message">CART IS EMPTY</h5>
      ) : (
        <>
          <h1 className="cart-heading">Cart</h1>
          <div className="cart-wrapper">
            <div className="product-list">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onRemove={removeProduct} />
              ))}
            </div>
            <div className="cart-info">
              <p className="total-items">Total Items: {totalItems}</p>
              <CheckoutContainer products={products} />
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default Cart;
