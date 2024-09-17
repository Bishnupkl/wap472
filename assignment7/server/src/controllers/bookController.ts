import { Request, Response, NextFunction } from "express";
import Book from "../models/book";

export const save = (req: Request, res: Response, next: NextFunction) => {
    const { title, price, description } = req.body;
    const newBook = new Book(null, title, price, description).save();
    res.status(201).json(newBook);
}

export const getAll = (req: Request, res: Response) => {
    res.json(Book.fetchAll());
}

export const getById = (req: Request, res: Response) => {
    res.json(Book.fetchById(req.params.id));
}

export const updateById = (req: Request, res: Response) => {
    const { title, price, description } = req.body;
    new Book(req.params.id, title, price, description).update();
    res.status(204).end();
}

export const deleteById = (req: Request, res: Response) => {
    res.status(204).json(Book.deleteById(req.params.id));
}