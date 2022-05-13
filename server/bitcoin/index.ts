import 'dotenv/config';
import QueryBase from './Base';

const USER = process?.env.BITCOIN_RPC_USER;
const PASS = process?.env.BITCOIN_RPC_PASS;
const RPCPORT = process?.env.BITCOIN_RPC_PORT;
const RPCURL = process?.env.BITCOIN_RPC_URL;


const base: QueryBase = new QueryBase(USER, PASS, RPCURL, Number(RPCPORT));

export default base;