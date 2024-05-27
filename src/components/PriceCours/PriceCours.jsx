import { useDispatch, useSelector } from 'react-redux';
import PriceCard from '../PriceCard/PriceCard';
import styles from './PriceCours.module.scss';
import { useState } from 'react';

const PriceCours = ({ btnColor }) => {
  const { cards } = useSelector(({ products }) => products);
  const [modal, setModal] = useState(false);
  return (
    <div className={styles.priceCours}>
      <h1 className={styles.title}>Выберите свой тариф</h1>
      <p className={styles.subtitle}>
        Наши координаторы помогают в обучении, решают организационные проблемы
      </p>
      <div className={styles.wrapper}>
        {cards.map((card) => (
          <PriceCard key={card.id} btnColor={btnColor} title={card.title} price={card.price} modal={modal} setModal={setModal}/>
        ))}
      </div>
    </div>
  );
};

export default PriceCours;


