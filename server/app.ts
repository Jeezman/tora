import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// App middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // responseError(res, 500, err.message);
    }
});

export default app;