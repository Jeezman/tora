import { useState, useContext, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Button } from '../../components/shared/Button';
import { ProductCard } from '../../components/shared/ProductCard';
import { ProductForm } from '../../components/shared/ProductForm';
import styles from '../../styles/Product.module.css';
import { StoreContext } from '../context/StoreContext';
import { ProductRequestModel } from '../models/store.model';

function Products() {
  const [showProductForm, setShowProductForm] = useState(false);
  const { handleAddProduct, handleGetAllProducts, products } =
    useContext(StoreContext);
  const closeProductForm = () => {
    setShowProductForm(false);
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const onAddProduct = (data: ProductRequestModel) => {
    handleAddProduct(data);
    closeProductForm();
  };

  const handleProductClick = () => {};
  return (
    <section>
      <div className={styles.top}>
        <h1>Products</h1>
        <Button onClick={() => setShowProductForm(!showProductForm)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-4 mt-20">
        {products?.map((product) => (
          <ProductCard
            name={product.name}
            key={product.productId}
            amount={product.amount}
            description={product.description}
            dTimeline={product.dTimeline}
            count={product.count}
            image={product.image}
            onClick={handleProductClick}
          />
        ))}
      </div>
      <ProductForm
        show={showProductForm}
        close={closeProductForm}
        onSubmit={onAddProduct}
      />
    </section>
  );
}

Products.layout = DashboardLayout;

export default Products;
