import { ROUTES } from '../../../utils/conts';
import styles from './CardLearnMyCours.module.scss';

import { Link } from 'react-router-dom';

const CardLearnMyCours = ({ title, id }) => {
  return (
    <Link to={`${ROUTES.SINGLE_MY_COURS_TASK}/${id}`} className={styles.cardLearnMyCours}>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
        <div>
          <p>100%</p>
          <div className={styles.prograss} />
        </div>
      </div>
    </Link>
  );
};

export default CardLearnMyCours;
