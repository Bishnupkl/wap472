import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const productsDatabasePath = path.join(__dirname, '../../database/products.txt');

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
}

router.get('/', (req: Request, res: Response) => {
    fs.readFile(productsDatabasePath, 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error reading products file');
        }

        const products: Product[] = data ? JSON.parse(data) : [];
        res.json(products);
    });
});

router.post('/', (req: Request, res: Response) => {
    const { id, title, price, description } = req.body;

    const newProduct: Product = {
        id,
        title,
        price,
        description
    };

    fs.readFile(productsDatabasePath, 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error reading products file');
        }

        const products: Product[] = data ? JSON.parse(data) : [];
        products.push(newProduct);

        fs.writeFile(productsDatabasePath, JSON.stringify(products, null, 2), 'utf-8', (err) => {
            if (err) {
                return res.status(500).send('Error saving product');
            }
            res.send(`Product ${title} added!`);
        });
    });
});

export default router;
