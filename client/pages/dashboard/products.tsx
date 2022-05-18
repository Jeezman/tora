import { DashboardLayout } from "../../components/DashboardLayout";
import { Button } from "../../components/shared/Button";
import styles from '../../styles/Product.module.css'

 function Products() {
  return (
    <section>
      <div className={styles.top}>
        <h1>Products</h1>
        <Button>Add New Product</Button>
      </div>
    </section>
  );
}

Products.layout = DashboardLayout;

export default Products;