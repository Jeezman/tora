import { Router } from 'express';
import { 
    generateInvoice, 
    generatePin, 
    makeCrowdPayment, 
    getCrowdPayment, 
    createCrowdPayment 
} from '../../controllers/payment';
const router = Router();

router.post('/order/:orderId', generateInvoice);

router.get('/generatepin', generatePin);

router.post('/crowd', makeCrowdPayment);

router.get('/crowd/:check', getCrowdPayment);

router.post('/create/:paymentId', createCrowdPayment);

export default router;