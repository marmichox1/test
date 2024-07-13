import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, List, Button, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ProductItem from './productItem';
import ProductForm from './ProductForm';
import { fetchProducts, deleteProduct } from '../slices/productsSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '800px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: theme.spacing(3),
        backgroundColor: '#f9f9f9',
        boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginBottom: theme.spacing(2),
    },
    list: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
    },
}));

const ProductList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    return (
        <Container className={classes.root}>
            <Typography variant="h4" className={classes.title}>Liste des Produits</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className={classes.button}
                startIcon={<Add />}
            >
                Ajouter Produit
            </Button>
            <ProductForm
                open={open}
                handleClose={handleClose}
                selectedProduct={selectedProduct}
            />
            <List className={classes.list}>
                {products.map(product => (
                    <ProductItem
                        key={product._id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </List>
        </Container>
    );
};

export default ProductList;
