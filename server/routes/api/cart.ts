import { Router } from 'express';
import { deleteFromCart, addToCart, updateCart } from '../../controllers/cart';
import { authUser } from '../../helpers/auth';
const router = Router();

router.post('/add', addToCart);

router.put('/update', updateCart);

router.post('/delete', deleteFromCart);

export default router;