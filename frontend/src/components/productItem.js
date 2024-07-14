import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <>
            <ListItem>
                <ListItemText
                    primary={product.name}
                    secondary={`Type: ${product.type} | Prix: $${product.price} | Note: ${product.rating} | Garantie: ${product.warranty_years} ans | Disponible: ${product.available ? 'Oui' : 'Non'}`}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => onEdit(product)}>
                        <Edit color="primary" />
                    </IconButton>
                    <IconButton edge="end" onClick={() => onDelete(product._id)}>
                        <Delete color="secondary" />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </>
    );
};

export default ProductItem;
