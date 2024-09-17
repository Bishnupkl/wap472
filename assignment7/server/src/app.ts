import express from 'express';
import { Request, Response, NextFunction } from "express";
import cors from 'cors';

import productRouter from './routes/bookRouter';

const app = express();

app.use(cors());
app.use(express.json()); //req.body = {title: Apple, price: 599, description: Great job!}

app.use(productRouter);

app.use((req, res, next) => {
    res.json({success: false, error: 'API NOT Found!'});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({success: false, error: err.message});
})

app.listen(3000, () => console.log('listening on 3000'));