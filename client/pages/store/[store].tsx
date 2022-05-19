import { useContext, useEffect } from 'react';
import { ProductCard } from '../../components/shared/ProductCard';
import styles from '../../styles/Store.module.css';
import { StoreContext } from '../context/StoreContext';

function Store() {
  const { handleAddProduct, handleGetAllProducts, products, storeName } =
    useContext(StoreContext);

  const handleProductClick = () => {
    // console.log('product cliecked')
  };

 useEffect(() => {
    if(!!storeName) handleGetAllProducts();
  }, [storeName]);

  return (
    <section className={styles.container}>
      <h1 className='mb-8 text-5xl'>{storeName} <span className='text-2xl'>by Satoshi</span></h1>
      <div className="grid gap-4 grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product.productId}
            onClick={handleProductClick}
            name={product.name}
            amount={product.amount}
            description={product.description}
            dTimeline={product.dTimeline}
            count={product.count}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}

export default Store;
