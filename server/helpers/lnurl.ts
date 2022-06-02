// const lnurl = require('lnurl');
import lnurl from 'lnurl';
import 'dotenv/config';
import { LnurlpayRes } from '../interfaces/Lnurl';
import { subscribeToInvoice } from './paymentHelper';

const lnurlServer = lnurl.createServer({
    host:"localhost",
    url: process.env.SERVER_BASE_URL,
    port: 5002,
    endpoint: "/api/user/lnurl",
    auth: {
		apiKeys: [],
	},
    lightning: {
		"backend": "lnd",
		"config": {
			"hostname": process.env.LND_RPC_URL,
			"cert": process.env.LND_TLS_PATH,
            "macaroon": process.env.LND_MACROON_PATH
		}
	},
	store: {
		backend: 'knex',
		config: {
			client: 'postgres',
			connection: {
				host: '127.0.0.1',
				user: process.env.DEV_DB_USER,
				password: process.env.DEV_DB_PASS,
				database: 'lnurl_server',
			},
		},
	},
});

lnurlServer.on('payRequest:action:processed', function(event: LnurlpayRes) {
	const { secret, params, result } = event;
	const { id, invoice } = result;

	subscribeToInvoice(invoice);
	// `id` - non-standard reference ID for the new invoice, can be NULL if none provided
	// `invoice` - bolt11 invoice
});


export default lnurlServer;