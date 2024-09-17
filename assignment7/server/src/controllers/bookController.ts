import { Request, Response, NextFunction } from "express";
import Book from "../models/book";

export const save = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { title,ISBN,publishedDate,author } = req.body;
    const newBook = new Book(null, title,ISBN,publishedDate,author).save();
    res.status(201).json(newBook);
}

export const getAll = (req: Request, res: Response) => {
    res.json(Book.fetchAll());
}

export const getById = (req: Request, res: Response) => {
    res.json(Book.fetchById(req.params.id));
}

export const updateById = (req: Request, res: Response) => {
    const { title,ISBN,publishedDate,author } = req.body;
    new Book(req.params.id, title,ISBN,publishedDate,author).update();
    res.status(204).end();
}

export const deleteById = (req: Request, res: Response) => {
    res.status(204).json(Book.deleteById(req.params.id));
}