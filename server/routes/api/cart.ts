import { Router } from 'express';
import { deleteFromCart, addToCart, updateCart, listCart, cartCheckout, deleteAllFromCart } from '../../controllers/cart';
import { authUser } from '../../helpers/auth';
const router = Router();

router.post('/add', addToCart);

router.get('/list', listCart);

router.put('/update', updateCart);

router.delete('/delete', deleteFromCart);

router.delete('/deleteall', deleteAllFromCart);

router.post('/checkout', authUser, cartCheckout);

export default router;