import React, { useEffect } from 'react';
import './Completion.css';

function Completion(props) {
  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="completion-container">
      <h1>Thank you for your order! 🎉</h1>
    </div>
  );
}

export default Completion;
