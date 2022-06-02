import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import routes from './routes';
import { responseError } from './helpers';
import passport from 'passport';
import session from 'express-session';
import initializePassport from './helpers/passport';
import { walletCheck } from './services/wallet';
import { cron } from './services/cron';
import 'dotenv/config';
import socket from './config/socket';
// import lnurlServer from './helpers/lnurl';

const app: Application = express();
const server: http.Server = http.createServer(app);

// const tag = 'payRequest';
// const params = {
//     minSendable: 10000,
//     maxSendable: 200000,
//     metadata: '[["text/plain", "lnurl-node"]]',
//     commentAllowed: 500,
// };

// lnurlServer.generateNewUrl(tag, params).then((result: any) => {
//     const { encoded, secret, url } = result;
//     console.log({ encoded, secret, url });
// }).catch((err: Error) => {
//     console.error((err as Error));
// });


// Create Tora wallet
walletCheck();
cron();
socket(server);

// App middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

initializePassport();
app.use(passport.authenticate('lnurl-auth'));

app.use('/', routes);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        responseError(res, 500, err.message);
    }
});

export default server;