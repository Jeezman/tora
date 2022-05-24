import { Router } from 'express';
import { registerUser, loginUser, updateUserDetails, pseudoLogin, lnurlLogin, userBalance } from '../../controllers/user';
import { authUser } from '../../helpers/auth';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/login-lnurl', lnurlLogin);

router.get('/lnurl', pseudoLogin);

router.put('/details', authUser, updateUserDetails);

router.get('/balance', authUser, userBalance);

export default router;