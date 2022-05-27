import { Router } from 'express';
import { generateInvoice } from '../../controllers/payment';
const router = Router();

router.post('/order/:orderId', generateInvoice);

export default router;