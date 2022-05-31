import { Router } from 'express';
import { generateInvoice, generatePin, makeCrowdPayment, getCrowdPayment } from '../../controllers/payment';
const router = Router();

router.post('/order/:orderId', generateInvoice);

router.get('/generatepin', generatePin);

router.post('/crowd', makeCrowdPayment);

router.get('/crowd/:code', getCrowdPayment);

export default router;