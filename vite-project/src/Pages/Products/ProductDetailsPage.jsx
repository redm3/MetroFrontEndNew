import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './ProductDetailsPage.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setSize('');
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const addToCart = () => {
    const notify = () => toast("Item added to cart!");
    const cartItem = {
      id: product.id,
      _id: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      gender,
      size,
    };

    const storedCart = localStorage.getItem('cart');
    let cart = [];

    if (storedCart) {
      cart = JSON.parse(storedCart);
    }

    const existingCartItemIndex = cart.findIndex((item) => item.id === product.id && item.gender === gender && item.size === size);

    if (existingCartItemIndex >= 0) {
      cart[existingCartItemIndex].quantity += 1;
    } else {
      cartItem.quantity = 1;
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Updated cart:', cart); // Log the updated cart array
    notify();

  };

  useEffect(() => {
    fetch(`https://metro-back-end.vercel.app/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.data));
  }, [id]);

  return (
    <Box border={0}>
      <Link to="/store">
        <Button
          sx={{
            position: 'sticky', // Change 'absolute' to 'sticky'
            top: '100px', // Change this value to move the button lower
            left: '1rem',
            backgroundColor: 'grey',
            color: 'white',
            '&:hover': {
              backgroundColor: 'black',
            },
            zIndex: 1, // Add a z-index to make sure the button stays on top of other elements
          }}
        >
          Back to Store
        </Button>
      </Link>
      <Link to="/cart">
        <Button
          sx={{
            position: 'fixed', // Change 'sticky' to 'fixed'
            top: '100px',
            right: '1rem', // Ensure 'right' is set to '1rem'
            backgroundColor: 'grey',
            color: 'white',
            '&:hover': {
              backgroundColor: 'black',
            },
            zIndex: 1000,
          }}
        >
          Go to Cart
        </Button>
      </Link>
      <Box border={0}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="product-details-container1">
          {product ? (
            <>
              <div className="product-image-container1">
                <img src={product.image} alt={product.title} className="product-image1" />
              </div>
              <div className="product-details1">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <FormControl fullWidth variant="outlined" style={{ marginBottom: '1rem' }}>
                  <InputLabel>Gender</InputLabel>
                  <Select value={gender} onChange={handleGenderChange} label="Gender">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="women">Women</MenuItem>
                    <MenuItem value="men">Men</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" style={{ marginBottom: '1rem' }}>
                  <InputLabel>Size</InputLabel>
                  <Select value={size} onChange={handleSizeChange} label="Size">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {gender === 'women' &&
                      [5, 6, 7].map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    {gender === 'men' &&
                      [8, 9, 10, 11, 12].map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {/* <Link to="/cart"> */}
                <Button
                  fullWidth
                  variant="contained"
                  className="add-to-cart-button1"
                  disabled={!gender || !size}
                  onClick={addToCart}
                  sx={{
                    backgroundColor: 'grey',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                    '&:disabled': {
                      backgroundColor: 'lightgrey',
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&:disabled:hover': {
                      backgroundColor: 'lightgrey',
                    },
                  }}
                >
                  Add to Cart
                </Button>
                {/* </Link> */}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default ProductDetailsPage;
