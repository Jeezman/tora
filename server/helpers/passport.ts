import LnurlAuth from 'passport-lnurl-auth';
import passport from 'passport';
import knex from '../db/knex';
import { DB } from '../interfaces/Db';

const initializePassport = () => {

    passport.serializeUser((user: DB.User, done) => {
        // console.log('User from Serialize ==', user);
        done(null, user.publicKey);
    });

    passport.deserializeUser((user: DB.User, done) => {
        done(null, user.publicKey || null);
    });

    passport.use(new LnurlAuth.Strategy(async (linkingPublicKey: string, done: (d: any, u: DB.User) => void) => {
        let user: DB.User;
        console.log('USER KEY ===', linkingPublicKey)
        let users: DB.User[] = await knex<DB.User>('Users').where({ publicKey: linkingPublicKey });

        if (users.length === 0) {
            await knex<DB.User>('Users').insert({ publicKey: linkingPublicKey });
        }

        user = users[0];
        return done(null, user);
    }));
};

export default initializePassport;