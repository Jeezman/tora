import { Router } from 'express';
import { registerUser, loginUser, updateUserDetails } from '../../controllers/user';
import { authUser } from '../../helpers/auth';
const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/details', authUser, updateUserDetails);

export default router;