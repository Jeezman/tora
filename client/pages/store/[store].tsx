import { useContext, useEffect, useState } from 'react';
import { CartIcon, CartIconBag } from '../../assets/icons';
import { Button } from '../../components/shared/Button';
import { ProductCard } from '../../components/shared/ProductCard';
import styles from '../../styles/Store.module.css';
import { CartContext } from '../context/CartContext';
import { StoreContext } from '../context/StoreContext';
import { useRouter } from 'next/router';

function Store() {
  const {
    handleAddProduct,
    handleGetAllProducts,
    products,
    storeName,
    setStoreName,
  } = useContext(StoreContext);
  const { handleAddToCart, handleFetchCart, cartItems, handleCartCheckout } =
    useContext(CartContext);
  const [sidebarActive, setSidebarActive] = useState(false);

  const router = useRouter();
  
   useEffect(() => {
     setStoreName(router.query.store)
  }, []);

  useEffect(() => {
    if (!!storeName) handleGetAllProducts();
  }, [storeName]);

  useEffect(() => {
    handleFetchCart();
  }, []);

  const onAddToCart = (product: any) => {
    console.log('handleProductClick ', product);
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
    alert('checking out');
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
          <Button onClick={handleCheckout}>Checkout</Button>
        </div>
        <div
          onClick={() => setSidebarActive(!sidebarActive)}
          className={styles.cart_sidebar_overlay}
        ></div>
      </section>
    </section>
  );
}

export default Store;
