import { Router } from 'express';
import { registerUser, loginUser, updateUserDetails } from '../../controllers/user';
import LnurlAuth from 'passport-lnurl-auth';
import path from 'path';
import { authUser } from '../../helpers/auth';
import { DB } from '../../interfaces/Db';
import 'dotenv/config';
import passport from 'passport';

const router = Router();
const frontendLogin  = process.env.FRONTEND_LOGIN_URL;

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/nouser', (req, res, next) => {
    if (req.user) {
        const reqUser = req.user as DB.User;
        return res.redirect(`${frontendLogin}?pubkey=${reqUser.publicKey}`);
    } else {
      return res.redirect('https://51ff-102-89-34-251.eu.ngrok.io/api/user/login')
    }
})

router.get('/login', (req, res, next) => {
    if (req.user) {
        const reqUser = req.user as DB.User;
        return res.redirect(`${frontendLogin}?pubkey=${reqUser.publicKey}`);
    } else {
        return res.redirect('https://51ff-102-89-34-251.eu.ngrok.io/api/user/nouser')
        // next();
    }
},
    new LnurlAuth.Middleware({
        callbackUrl: 'https://51ff-102-89-34-251.eu.ngrok.io/api/user/login',
        cancelUrl: 'https://51ff-102-89-34-251.eu.ngrok.io',
        instruction: 'Scan the QR code to login',
        title: 'Login using lnurl-auth',
        loginTemplateFilePath: path.join(__dirname, '..', '..', 'public', 'login.html'),
        refreshSeconds: 30,
    })
);

router.put('/details', authUser, updateUserDetails);

export default router;