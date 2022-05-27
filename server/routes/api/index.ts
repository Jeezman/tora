import {Router} from 'express';
import user from './user';
import store from './store';
import cart from './cart';
import payment from './payment';

const router = Router();

router.use('/user', user);

router.use('/store', store);

router.use('/cart', cart);

router.use('/payment', payment);

export default router;
