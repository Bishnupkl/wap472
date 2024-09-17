import {Router, Request, Response} from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const usersDatabasePath = path.join(__dirname, '../../database/users.txt');

interface User {
    id: string;
    username: string;
    password: string;
}


router.get('/', (req: Request, res: Response) => {
    fs.readFile(usersDatabasePath, 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error reading user file');
        }

        const products: User[] = data ? JSON.parse(data) : [];
        res.json(products);
    });
});


function generateRandomID(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


router.get('/add-user', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/add-user', (req: Request, res: Response) => {
    const {username, password} = req.body;

    const newUser: User = {
        id: generateRandomID(),
        username,
        password
    };

    fs.readFile(usersDatabasePath, 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error reading users file');
        }

        const users: User[] = data ? JSON.parse(data) : [];
        users.push(newUser);

        fs.writeFile(usersDatabasePath, JSON.stringify(users, null, 2), 'utf-8', (err) => {
            if (err) {
                return res.status(500).send('Error saving user');
            }
            res.status(200).send({message: `User ${username} registered successfully!`});
        });
    });
});

export default router;
