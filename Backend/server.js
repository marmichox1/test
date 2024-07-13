const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String
});

const Product = mongoose.model('Product', productSchema);

app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.get('/api/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
});

app.put('/api/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
});

app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
