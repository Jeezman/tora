import { Router } from 'express';
import { 
    addProduct, 
    createStore, 
    listStores, 
    storeProducts,
    updateProduct, 
    productImage 
} from '../../controllers/store';
import { authUser } from '../../helpers/auth';
const router = Router();

router.post('/create', authUser, createStore);

router.get('/list', authUser, listStores);

router.post('/product', authUser, addProduct);

router.put('/product', authUser, updateProduct);

router.get('/products/:storeName', storeProducts);

router.post('/product/image', authUser, productImage);

export default router;