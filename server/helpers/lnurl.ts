const lnurl = require('lnurl');

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
				user: '',
				password: '',
				database: 'lnurl_server',
			},
		},
	},
});

export default lnurlServer;