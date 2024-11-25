import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import jwt_decode from 'jwt-decode';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';



const fetchUserDataById = async (userId) => {
  try {
    const response = await fetch(`https://metro-back-end.vercel.app/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }

    const userData = await response.json();
    // Make sure the userData object is in the correct format
    // You might need to adjust the object structure based on your API response
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function AddressForm({currentOrder, orderHandler}) {
  const [userData, setUserData] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwt_decode(token);
      const userId = decoded.user_id;
  
      fetchUserDataById(userId).then((data) => {
        setUserData(data.data);
        console.log(data);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  

  React.useEffect(() => {
    
    orderHandler({...currentOrder, ...userData})
    console.log(userData); // Log the userData
    console.log({...currentOrder, ...userData})
  }, [userData]);

  const handleSubmit = (e) =>{
    e.preventDefault()
    let data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
    setUserData(formObject)
    
  } 
  
  console.log(currentOrder)
  return (
    <React.Fragment>
       {isLoggedIn ? (
      <form onSubmit={handleSubmit}> 
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={userData?.name?.firstname || ''}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={userData?.name?.lastname || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={userData?.address?.number || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={userData?.address?.street || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={userData?.address?.city || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={userData?.address?.zipcode || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
      </Grid>
      </form>
    ) : (
      <Dialog open={!isLoggedIn} maxWidth="sm" fullWidth>
        <DialogTitle>Please log in to continue</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You need to be logged in to access this page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = '/login')}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    )}

    </React.Fragment>
  );
}