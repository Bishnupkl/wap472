// import { nanoid } from 'nanoid';

let books: Book[] = [];

export default class Book {

    constructor(public id: string | null,public title:string, public ISBN: string, public publishedDate: number, public author: string){
    }

    save(){
        this.id = new String(Math.random()).toString();
        books.push(this);
        return this;
    }

    update(){
        const index = books.findIndex(p => p.id === this.id);
        if(index > -1) {
            books[index] = this;
        } else {
            throw new Error(`No Book found with id: ${this.id}`);
        }
    }

    static fetchAll(){
        return books;
    }

    static fetchById(id: string){
        const book = books.find(p => p.id === id);
        if(book){
            return book;
        } else {
            throw new Error(`No Book found with id: ${id}`);
        }
    }

    static deleteById(id: string){
        const index = books.findIndex(p => p.id === id);
        if(index > -1) {
           books = books.filter(p => p.id !== id);
        } else {
            throw new Error(`No Book found with id: ${id}`);
        }
    }


}