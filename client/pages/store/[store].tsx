import { useCallback, useContext, useEffect, useState, memo, useRef } from 'react';
import { CartIcon, CartIconBag } from '../../assets/icons';
import { Button } from '../../components/shared/Button';
import { ProductCard } from '../../components/shared/ProductCard';
import styles from '../../styles/Store.module.css';
import { StoreContext } from '../context/StoreContext';
import { useRouter } from 'next/router';
import CartList from '../../components/CartList';
import { storeData } from '../../util/storage';

function Store() {
  const {
    handleAddProduct,
    handleGetAllProducts,
    products,
    storeName,
    setStoreName,
    handleAddToCart,
    handleFetchCart,
    cartItems,
    handleCartCheckout
  } = useContext(StoreContext);
  const [sidebarActive, setSidebarActive] = useState(false);
  const MOUNTED = useRef(true);

  const router = useRouter();

  useEffect(() => () => { MOUNTED.current = false; }, [])

  useEffect(() => {
    if(MOUNTED.current && router.query.store) {
      setStoreName(router.query.store);
      handleGetAllProducts(router.query.store)
      storeData('store', JSON.stringify(router.query.store));
      MOUNTED.current = true;
    }
  }, [handleGetAllProducts, router.query.store, setStoreName]);

  useEffect(() => {
    if (MOUNTED.current) {
      handleFetchCart();
      MOUNTED.current = true;
    }
  }, [handleFetchCart]);
  

  const onAddToCart = (product: any) => {
    let data = {
      productId: product.productId,
      amount: product.amount,
      itemCount: 1,
      total: product.amount * 1,
      storeId: product.storeId,
    };

    handleAddToCart(data);
  };

  const handleCheckout = () => {
    router.push(`/store/${router.query.store}/checkout`)
  };

  return (
    <section className={styles.container}>
      <div
        onClick={() => setSidebarActive(!sidebarActive)}
        className={styles.icon}
      >
        <CartIconBag width={22} height={25} color="#3d7db8" />
        {cartItems.length > 0 && (
          <h4 className={styles.icon_no}>{cartItems.length}</h4>
        )}
      </div>
      <h1 className="mb-8 text-5xl">
        {storeName} <span className="text-2xl">by Satoshi</span>
      </h1>
      <div className="grid gap-4 grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product.productId}
            onClick={() => onAddToCart(product)}
            name={product.name}
            amount={product.amount}
            description={product.description}
            dTimeline={product.dTimeline}
            count={product.count}
            image={product.image}
          />
        ))}
      </div>
      <section className={styles.main_sidebar}>
        <div
          className={`${styles.cart_sidebar} ${
            sidebarActive ? styles.active : ''
          }`}
        >
          <CartList items={cartItems} />
          <Button disabled={false} onClick={handleCheckout}>Checkout</Button>
        </div>
        <div
          onClick={() => setSidebarActive(!sidebarActive)}
          className={styles.cart_sidebar_overlay}
        ></div>
      </section>
    </section>
  );
}

export default memo(Store);
