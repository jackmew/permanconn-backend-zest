import { Router  } from 'express';
import {
    addProduct,
    deleteProduct,
    limitAndSkipProducts,
    searchProducts,
    updateProduct
} from "../controllers/productController";
const router = Router();

router.get('/', async (req, res) => {
    res.send('Hello Permanconn!');
});
// GET all products
// router.get('/products', getProducts);

// Add a new product
router.post('/products/add', addProduct);

// Update a product
router.put('/products/:id', updateProduct);

// Delete a product
router.delete('/products/:id', deleteProduct);

// Search products
router.get('/products/search', searchProducts);

// Limit and skip products
router.get('/products', limitAndSkipProducts);


export default router;
