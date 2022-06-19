import { QRCodeSVG } from 'qrcode.react';
import { useContext } from 'react';
import { CartIconBag, MinusButtton, PlusButton } from '../assets/icons';
import { AuthContext } from '../pages/context/AuthContext';
import styles from '../styles/CartList.module.css';
import Image from 'next/image';

const CartList = ({ items }: any) => {
  const { lnData } = useContext(AuthContext);
  return (
    <section className={styles.container}>
      {items.map((item: any) => (
        <div key={item.productId} className={styles.cart_item}>
          <div className={styles.cart_icon}>
            <div className={styles.cart_image}>
              {item.product.image ? (
                <Image
                  alt="product image"
                  src={item.product.image}
                  objectFit="contain"
                  quality={100}
                  width={35}
                  height={25}
                />
              ) : (
                <CartIconBag width={25} height={25} color="#222" />
              )}
            </div>
          </div>
          <div className={styles.cart_item_details}>
            <p className={styles.cart_product}>{item.product.name}</p>
            <p className={styles.cart_price}>${item.product.amount}</p>
          </div>
          <div className={styles.cta_wrap}>
            <button className={styles.cta}>
              <MinusButtton />
            </button>
            <span className={styles.cta_value}>0</span>
            <button className={styles.cta}>
              <PlusButton />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CartList;
