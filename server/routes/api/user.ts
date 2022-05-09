import {Router} from 'express';
import { registerUser, loginUser, updateUserDetails } from '../../controllers/user';
const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/details', updateUserDetails);

export default router;