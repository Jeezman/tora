import { NextFunction, Request, Response, Router } from 'express';
import { registerUser, loginUser, updateUserDetails, pseudoLogin } from '../../controllers/user';
import { authUser } from '../../helpers/auth';
import { DB } from '../../interfaces/Db';
import 'dotenv/config';
const lnurl = require('lnurl');
import 'dotenv/config';
import lnurlServer from '../../helpers/lnurl';


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

router.get('/login-lnurl', (async (req, res, next) => {
    try {
        const result = await lnurlServer.generateNewUrl("login");

        res.send(result)
    } catch (error) {
        
    }
}));

router.get('/lnurl', pseudoLogin);

router.put('/details', authUser, updateUserDetails);


export default router;