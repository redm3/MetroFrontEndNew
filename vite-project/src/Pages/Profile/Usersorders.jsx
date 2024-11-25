import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
//import * as jwt_decode from 'jwt-decode';
import jwt_decode from 'jwt-decode';
function UserOrders() {
    const [orders, setOrders] = useState([]);



    const fetchUserOrders = async () => {
        // Decode the JWT token and extract the userId
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userObjectId;
        try {
            const response = await axios.get(`https://metro-back-end.vercel.app/api/orders/${userId}`);
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching user orders:', error);
        }
    };

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const orderColumns = [
        { field: '_id', headerName: 'Order ID', width: 250 },
        {
            field: 'date',
            headerName: 'Date',
            width: 200,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
        },
        {
            field: 'shippingAddress',
            headerName: 'Shipping Address',
            width: 400,
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
            width: 500,
            valueFormatter: (params) =>
                params.value.map((product) => `${product.title}, Size: ${product.size}, Gender: ${product.gender}`).join(', '),
        },
        {
            field: 'orderTotal',
            headerName: 'Order Total',
            width: 200,
        },
    ];

    return (
        <div>
            <h1>Check your orders</h1>
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

export default UserOrders;
