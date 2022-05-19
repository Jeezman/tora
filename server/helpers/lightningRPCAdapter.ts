import { Request, Response, NextFunction } from 'express';
import LightningManager from '../lib/lnd/lightningManager';

export let lightning = new LightningManager(
  './lib/lnd/proto/lnd.proto',
  process.env.LND_RPC_URL,
  process.env.LND_TLS_PATH,
  process.env.LND_MACROON_PATH
);

const lightningRPCAdapter =
  (methodName: string, options?: any) =>
  async (req: Request, res: Response) => {
    options = options || {};

    // By default, input parameters are empty. if preHook was defined, we call
    // this and use the result and input parameters
    let params = {};
    if (options.preHook) {
      params = options.preHook(req);
    }

    try {
      let response = await lightning.call(methodName, params);

      // If result needs to be manipulated before it's returned
      // to the client (because postHook is defined), call postHook
      // and use the result as payload to return via JSON
      if (options.postHook) {
        response = options.postHook(req, response);
      }
      res.json(response);
    } catch (e) {
      res.json({ error: e });
    }
  };

export { lightningRPCAdapter };
