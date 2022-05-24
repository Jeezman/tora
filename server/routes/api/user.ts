import { Router } from 'express';
import { registerUser, loginUser, updateUserDetails, pseudoLogin, lnurlLogin } from '../../controllers/user';
import { authUser } from '../../helpers/auth'
import 'dotenv/config';
import 'dotenv/config';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/login-lnurl', lnurlLogin);

router.get('/lnurl', pseudoLogin);

router.put('/details', authUser, updateUserDetails);


export default router;