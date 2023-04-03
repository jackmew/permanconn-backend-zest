import { Router, Response } from 'express';
import { ProductModel } from './models/Product';
const router = Router();


const handleError = (res: Response, error: any, statusCode: number) => {
    if (error instanceof Error) {
        res.status(statusCode).json({ message: error.message });
    } else {
        res.status(statusCode).json({ message: 'An unknown error occurred' });
    }
}
// const saveProduct = async (product: IProduct) => {
//     try {
//         const newProduct = new ProductModel(product);
//         const savedProduct = await newProduct.save();
//         console.log('save product success');
//     } catch (error) {
//         console.log('save product error')
//     }
// }

router.get('/', async (req, res) => {
    // fetch data from original dummy products and save into mongodb
    // try {
    //     const filePath = path.resolve(__dirname, './data/products.json');
    //     const fileContent = await fs.readFile(filePath, 'utf-8');
    //     const jsonData = JSON.parse(fileContent);
    //     jsonData.products.forEach((product: any) => {
    //         console.log(product.title)
    //
    //         saveProduct(product);
    //     });
    //     res.status(200).json(jsonData);
    // } catch (error) {
    //     console.error('Error reading JSON file:', error);
    //     res.status(500).json({ message: 'Error reading JSON file' });
    // }
    res.send('Hello Permanconn!');
});
// GET all products
router.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'error' });
    }
});

// Add a new product
router.post('/products/add', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body)
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        handleError(res, error, 400);
    }
});

// Update a product
router.put('/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        handleError(res, error, 400);
    }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndRemove(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json({ message: 'Product deleted successfully' });
        }
    } catch (error) {
        handleError(res, error, 500);
    }
});

// Search products
router.get('/products/search', (req, res) => {
    // Add your logic here
});

// Limit and skip products
router.get('/products', (req, res) => {
    // Add your logic here
});


export default router;
