import { Router } from 'express';
import { deleteFromCart, addToCart, updateCart, listCart } from '../../controllers/cart';
const router = Router();

router.post('/add', addToCart);

router.get('/list', listCart);

router.put('/update', updateCart);

router.delete('/delete', deleteFromCart);

export default router;