import express from 'express';
import {save, getAll, getById, updateById, deleteById} from '../controllers/bookController';

const router = express.Router();

// router.post('/books', bookController.save);
router.post('/books', save);
router.get('/books', getAll);
router.get('/books/:id', getById);
router.put('/books/:id', updateById);
router.delete('/books/:id', deleteById);





export default router;