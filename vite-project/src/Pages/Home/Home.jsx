import React, { useState, useEffect } from 'react'; 
import Logo from '../../../Public/Assets/metro-logo.png'; // Metro logo
import Balloons from '../../../Public/Assets/balloons.png'
import Footer from '../../Components/Footer/Footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [product3, setProduct3] = useState(null);
  const [product4, setProduct4] = useState(null);

  useEffect(() => {
    fetch('https://metro-back-end.vercel.app/api/products/1')
      .then((response) => response.json())
      .then((data) => setProduct1(data.data));

    fetch('https://metro-back-end.vercel.app/api/products/2')
      .then((response) => response.json())
      .then((data) => setProduct2(data.data));

    fetch('https://metro-back-end.vercel.app/api/products/3')
      .then((response) => response.json())
      .then((data) => setProduct3(data.data));

    fetch('https://metro-back-end.vercel.app/api/products/4')
      .then((response) => response.json())
      .then((data) => setProduct4(data.data));
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      className="container"
      style={{
        textAlign: 'center',
        minHeight: '120vh',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 3,
      }}
    >
      <div
        className="logo-container"
        style={{
          display: 'block',
          margin: '20px auto',
          width: '80%',
          padding: '0 20px',
          flexGrow: 2,
        }}
      >
        <img
          src={Logo}
          alt="Metro Logo"
          style={{
            display: 'block',
            margin: '10px auto',
            maxWidth: '100%',
          }}
        />
        
        {/* Balloon Image */}
        <img
          src={Balloons}// Correct path to image
          alt="Balloons"
          style={{
            display: 'block',
            margin: '0px auto',
            maxWidth: '15%',
            height: 'auto',
          }}
        />
        
        <h1>Restocked</h1>
        <h3>Don't miss out</h3>

        {product1 && product2 && product3 && product4 ? (
          <Carousel responsive={responsive} arrows>
            <div key={product1.id} className="product-container">
              <h2>{product1.title}</h2>
              <Link to={`/products/${product1.id}`}>
                <img src={product1.image} alt={product1.title} className="product-image product-image-hover" />
                <span className="product-price">${product1.price}</span>
              </Link>
            </div>
            <div key={product2.id} className="product-container">
              <h2>{product2.title}</h2>
              <Link to={`/products/${product2.id}`}>
                <img src={product2.image} alt={product2.title} className="product-image product-image-hover" />
                <span className="product-price">${product2.price}</span>
              </Link>
            </div>
            <div key={product3.id} className="product-container">
              <h2>{product3.title}</h2>
              <Link to={`/products/${product3.id}`}>
                <img src={product3.image} alt={product3.title} className="product-image product-image-hover" />
                <span className="product-price">${product3.price}</span>
              </Link>
            </div>
            <div key={product4.id} className="product-container">
              <h2>{product4.title}</h2>
              <Link to={`/products/${product4.id}`}>
                <img src={product4.image} alt={product4.title} className="product-image product-image-hover" />
                <span className="product-price">${product4.price}</span>
              </Link>
            </div>
          </Carousel>
        ) : (
          <CircularProgress />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
