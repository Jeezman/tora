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
import 'dotenv/config';

const app: Application = express();
const server = http.createServer(app);

// Create Tora wallet
walletCheck();

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