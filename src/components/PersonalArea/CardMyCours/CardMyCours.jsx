import styles from './CardMyCours.module.scss';

import { Link } from 'react-router-dom';

import bg from './../../../images/bgs.png';
import { ROUTES } from '../../../utils/conts';

const CardMyCours = ({ title, description, style, id, disable = true, img }) => {
  return (
    <>
      {disable ? (
        <Link disable={disable} to={`${ROUTES.SINGLE_MY_COURS}/${id}`}>
          <div className={`${styles.cardLink} ${style}`}>
            <div className={styles.text}>
              <span>Курс</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <img src={img} className={styles.img} alt="" />
          </div>
        </Link>
      ) : (
        <div className={`${styles.card} ${style}`}>
          <div className={styles.text}>
            <span>Курс</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <img src={img} className={styles.img} alt="" />
        </div>
      )}
    </>
  );
};

export default CardMyCours;
