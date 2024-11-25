import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import '../Admin/Admin.css';

function Admin() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://metro-back-end.vercel.app/api/orders');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };


  //create
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });
  //modify
  const [modifyOpen, setModifyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://metro-back-end.vercel.app/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setNewProduct({ ...newProduct, [name]: value });
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders(); // Add this line
  }, []);

  const handleModifyOpen = (id) => {
    setSelectedProduct(products.find((product) => product.id === id));
    setModifyOpen(true);
  };

  const handleModifyClose = () => {
    setModifyOpen(false);
    setSelectedProduct(null);
  };


  const modifyProduct = (id) => {
    console.log('Modify product with ID:', id);
    handleModifyOpen(id);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://metro-back-end.vercel.app/api/products/delete/${id}`);
      console.log('Product deleted with ID:', id);
      fetchProducts(); // Update the product list after deleting
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://metro-back-end.vercel.app/api/products/create', newProduct);
      setOpen(false);
      setNewProduct({
        id: '',
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleModifySubmit = async () => {
    if (!selectedProduct) return;
    try {
      await axios.put(`https://metro-back-end.vercel.app/api/products/update/${selectedProduct.id}`, selectedProduct);
      handleModifyClose();
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const orderColumns = [
    { field: '_id', headerName: 'Order ID', width: 250 },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: 'userId', headerName: 'User ID', width: 250 },
    {
      field: 'shippingAddress',
      headerName: 'Shipping Address',
      width: 500,
      valueFormatter: (params) => {
        const {
          firstName,
          lastName,
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          country,
        } = params.value;
        return `${firstName} ${lastName}, ${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}, ${country}`;
      },
    },
    {
      field: 'products',
      headerName: 'Products',
      width: 1000,
      valueFormatter: (params) =>
        params.value.map((product) => `ID: ${product.title}, Size: ${product.size} Quantity: ${product.quantity}, Gender: ${product.gender}`).join(', '),
    },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 500, editable: true },
    { field: 'price', headerName: 'Price', type: 'number', width: 110, editable: true },
    // Add more columns for other product properties
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => modifyProduct(params.row.id)}
          >
            Modify
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => deleteProduct(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Admin</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ marginBottom: '8px' }}
      >
        Add New Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="id" // Add this line
            id="id"
            label="ID"
            type="text"
            fullWidth
            value={newProduct.id}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            type="text"
            fullWidth
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <TextField
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modifyOpen} onClose={handleModifyClose}>
        <DialogTitle>Modify Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="id"
                label="ID"
                type="text"
                fullWidth
                value={selectedProduct.id}
                disabled
              />
              <TextField
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                value={selectedProduct.title}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, title: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, description: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="image"
                label="Image URL"
                type="text"
                fullWidth
                value={selectedProduct.image}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, image: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="category"
                label="Category"
                type="text"
                fullWidth
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, category: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModifyClose}>Cancel</Button>
          <Button onClick={handleModifySubmit}>Save</Button>
        </DialogActions>
      </Dialog>


      <Box sx={{ width: '100%' }}>
        <DataGrid
          sx={{ marginTop: '8px' }}
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <h1>Orders</h1>
      <Box sx={{ width: '100%' }}>
        <DataGrid
        getRowId={(row) => row._id}
          rows={orders}
          columns={orderColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default Admin;
