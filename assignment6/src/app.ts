import path from 'path';
import fs from 'fs';
import express, { Request, Response } from 'express';
import userRoutes from './routes/users';
import productRoutes from './routes/products';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/add-product', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
