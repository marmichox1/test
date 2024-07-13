import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Navbar = () => {
    return (
        <AppBar position="static" style={{ marginBottom: '20px' }}>
            <Toolbar>
                <Typography variant="h6">Produits</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
