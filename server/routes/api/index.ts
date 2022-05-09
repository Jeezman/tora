import {Router} from 'express';
const router = Router();
import user from './user';
import store from './store';

router.use('/user', user);

router.use('/store', store);

export default router;
