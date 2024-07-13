import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../slices/productsSlice';

const ProductForm = ({ open, handleClose, selectedProduct }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            setProduct({ name: '', description: '', price: '', category: '' });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = product.name ? "" : "Le nom est requis";
        tempErrors.description = product.description ? "" : "La description est requise";
        tempErrors.price = product.price ? "" : "Le prix est requis";
        if (product.price && isNaN(product.price)) {
            tempErrors.price = "Le prix doit être un nombre";
        }
        tempErrors.category = product.category ? "" : "La catégorie est requise";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            if (selectedProduct) {
                dispatch(updateProduct({ id: selectedProduct._id, product }));
            } else {
                dispatch(addProduct(product));
            }
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{selectedProduct ? 'Modifier Produit' : 'Ajouter Produit'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nom"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    label="Prix"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.price}
                    helperText={errors.price}
                />
                <TextField
                    label="Catégorie"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.category}
                    helperText={errors.category}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {selectedProduct ? 'Modifier' : 'Ajouter'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;
