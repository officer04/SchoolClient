import { ROUTES } from '../../../utils/conts';
import styles from './CardTasksMyCours.module.scss';

import { Link } from 'react-router-dom';

const CardTasksMyCours = ({ title, progress, img, id }) => {
  return (
    <Link to={`${ROUTES.SINGLE_MY_COURS_TASKS}/${id}`} className={styles.card}>
      <div className={styles.group}>
        <img src={img} alt="" />
        <p>{title}</p>
      </div>
      {/* <p className={styles.text}>{progress === false? "Не пройден" : "Пройден"}</p> */}
      {progress === false? <p className={styles.text2}>Не пройден</p> : <p className={styles.text}>Пройден</p>}
    </Link>
  );
};

export default CardTasksMyCours;
