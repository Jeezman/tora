import { useState } from 'react';
import { CartIcon } from '../../assets/icons';
import Image from 'next/image';
import styles from '../../styles/ProductCard.module.css';

interface Props {
  onClick: () => void;
}

export const ProductCard = ({ onClick }: Props) => {
  const [img, setImg] = useState('');
  return (
    <div className={styles.container}>
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
        <p className="name">Lagoon</p>
        <p className="price">500</p>
      </div>
    </div>
  );
};
