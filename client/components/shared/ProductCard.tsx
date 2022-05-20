import { useState } from 'react';
import { CartIcon } from '../../assets/icons';
import Image from 'next/image';
import styles from '../../styles/ProductCard.module.css';
import { ProductRequestModel } from '../../pages/models/store.model';

interface Props extends ProductRequestModel {
  onClick?: () => void;
}

export const ProductCard = ({ onClick, name, amount }: Props) => {
  const [img, setImg] = useState('');
  return (
    <div onClick={onClick} className={styles.container}>
      <div className={styles.image_wrap}>
        {!!img ? (
          <Image
            alt="Mountains"
            src="https://res.cloudinary.com/dze6uuzdx/image/upload/v1652792730/y4ymdlxmlrzlpzrqqhti.png"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        ) : (
          <CartIcon />
        )}
      </div>
      <div className={styles.details}>
        <p className="name">{name}</p>
        <p className="price">${amount}</p>
      </div>
    </div>
  );
};
