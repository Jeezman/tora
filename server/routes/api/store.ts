import { Router } from 'express';
import { createStore } from '../../controllers/store';
import { authUser } from '../../helpers/auth';
const router = Router();

router.post('/create', authUser, createStore);

export default router;