import { Router } from 'express';
import { registerUser, loginUser, updateUserDetails } from '../../controllers/user';
import LnurlAuth from 'passport-lnurl-auth';
import path from 'path';
import { authUser } from '../../helpers/auth';
const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/login', (req, res, next) => {
    if (req.user) {
        // console.log('user found', req.user);
        return res.redirect('/');
    }
    next();
},
    new LnurlAuth.Middleware({
        callbackUrl: 'https://9d0a-102-89-40-5.eu.ngrok.io/api/user/login',
        cancelUrl: 'https://9d0a-102-89-40-5.eu.ngrok.io',
        instruction: 'Scan the QR code to login',
        title: 'Login using lnurl-auth',
        loginTemplateFilePath: path.join(__dirname, '..', '..', 'public', 'login.html'),
        refreshSeconds: 30,
    })
);

router.put('/details', authUser, updateUserDetails);

export default router;