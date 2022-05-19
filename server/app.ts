import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
import routes from './routes';
import { responseError } from './helpers';
import passport from 'passport';
import session from 'express-session';
import initializePassport from './helpers/passport';
import { lightningRPCAdapter } from './helpers/lightningRPCAdapter';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

// App middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
}));

// test route
app.get('/lightning', lightningRPCAdapter("getNetworkInfo"))

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