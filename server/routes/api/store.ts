import { Router } from 'express';
import { addProduct, createStore } from '../../controllers/store';
import { authUser } from '../../helpers/auth';
const router = Router();

router.post('/create', authUser, createStore);

router.post('/product', authUser, addProduct)

export default router;