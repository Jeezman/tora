import LnurlAuth from 'passport-lnurl-auth';
import passport from 'passport';
import knex from '../db/knex';
import { DB } from '../interfaces/Db';

const initializePassport = () => {

    passport.serializeUser((user: DB.User, done) => {
        done(null, user.publicKey);
    });

    passport.deserializeUser((user: DB.User, done) => {
        done(null, user.publicKey || null);
    });

    passport.use(new LnurlAuth.Strategy(async (linkingPublicKey: string, done: (d: any, u: DB.User) => void) => {
        let user: DB.User;
        let users: DB.User[] = await knex<DB.User>('Users').where({ publicKey: linkingPublicKey });

        // console.log('Users ====', users);

        if (users.length === 0) {
            await knex<DB.User>('Users').insert({ publicKey: linkingPublicKey });
        }

        user = users[0];
        done(null, user);
    }));
};

export default initializePassport;