import {Router} from 'express';
const router = Router();
import user from './user';

router.use('/user', user);

export default router;
