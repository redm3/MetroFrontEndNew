import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

// Get cart data from local storage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Calculate total price
// Calculate total price
const calculateTotal = (products) => {
  const shippingCost = 0;
  const productsTotal = products
    .filter((product) => product.title !== 'Shipping')
    .reduce((total, product) => {
      const price = typeof product.price === 'string' ? product.price : product.price.toString();
      return total + parseFloat(price) * product.quantity;
    }, 0);

  const total = productsTotal + shippingCost;
  return parseFloat(total.toFixed(2));
};

const products = getCartFromLocalStorage();

export default function Review({currentOrder, orderHandler, setTotalPrice }) {

  const totalPrice = calculateTotal(products);
  console.log(totalPrice);
  React.useEffect(() => {
    orderHandler({ ...currentOrder, products, totalPrice });
    console.log({ ...currentOrder, products, totalPrice })
  }, []); 
  
  console.log(currentOrder)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" />
          <Typography variant="body2">Free</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid item container direction="column" xs={12} sm={6}></Grid>
    </React.Fragment>
  );
}
