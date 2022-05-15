import { AxiosResponse } from 'axios';
import bitrpc from '../bitcoinqueries';

/** Check if the node has up to 2 wallets if not create them */
export const walletCheck = async () => {
    try {
        const res: AxiosResponse = await bitrpc.listWallets();
        const wallets: string[] = res.data.result;

        // if the bitcoin node has no wallet named torawallet create one
        if(!wallets.includes('torawallet')) {
            await bitrpc.createWallet('torawallet');
        }
    } catch (err) {
        // Log error
        console.log('Wallet Error ===', (err as Error).message);
    }
}
