import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../slices/productsSlice';

const ProductForm = ({ open, handleClose, selectedProduct }) => {
    const [product, setProduct] = useState({
        name: '',
        type: '',
        price: '',
        rating: '',
        warranty_years: '',
        available: false
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            setProduct({ name: '', type: '', price: '', rating: '', warranty_years: '', available: false });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setProduct({ ...product, [name]: checked });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = product.name ? "" : "Le nom est requis";
        tempErrors.type = product.type ? "" : "Le type est requis";
        tempErrors.price = product.price ? "" : "Le prix est requis";
        if (product.price && isNaN(product.price)) {
            tempErrors.price = "Le prix doit être un nombre";
        }
        tempErrors.rating = product.rating ? "" : "La note est requise";
        if (product.rating && isNaN(product.rating)) {
            tempErrors.rating = "La note doit être un nombre";
        }
        tempErrors.warranty_years = product.warranty_years ? "" : "La garantie est requise";
        if (product.warranty_years && isNaN(product.warranty_years)) {
            tempErrors.warranty_years = "La garantie doit être un nombre";
        }
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
                    label="Type"
                    name="type"
                    value={product.type}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.type}
                    helperText={errors.type}
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
                    label="Note"
                    name="rating"
                    value={product.rating}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.rating}
                    helperText={errors.rating}
                />
                <TextField
                    label="Garantie (années)"
                    name="warranty_years"
                    value={product.warranty_years}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.warranty_years}
                    helperText={errors.warranty_years}
                />
                <TextField
                    label="Disponible"
                    name="available"
                    type="checkbox"
                    checked={product.available}
                    onChange={handleCheckboxChange}
                    fullWidth
                    margin="normal"
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
