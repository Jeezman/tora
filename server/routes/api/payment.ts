import { Router } from 'express';
import { generateInvoice, generatePin } from '../../controllers/payment';
const router = Router();

router.post('/order/:orderId', generateInvoice);

router.get('/generatepin', generatePin);

export default router;