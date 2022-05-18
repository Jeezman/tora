import {Router} from 'express';
const router = Router();
import user from './user';
import store from './store';
import cart from './cart';

router.use('/user', user);

router.use('/store', store);

router.use('/cart', cart);

export default router;
