import { ProductCard } from '../../components/shared/ProductCard';
import styles from '../../styles/Store.module.css';


function Store() {
  const handleProductClick = () => {
    console.log('product cliecked')
  }
  return (
    <section className={styles.container}>
      <h1>Store page</h1>
      <div className="grid gap-4 grid-cols-4">
        <ProductCard onClick={handleProductClick} />
        <ProductCard onClick={handleProductClick} />
        <ProductCard onClick={handleProductClick} />
      </div>
    </section>
  );
}

export default Store;