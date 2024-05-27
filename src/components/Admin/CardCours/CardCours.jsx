import styles from './CardCours.module.scss';

import { Link } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';

import { ROUTES } from '../../../utils/conts';

const CardCours = ({ id, title, description, bg, handleClickDeleteCourse }) => {

  return (
    <Link to={`${ROUTES.CHANGE_COURS}/${id}`}>
      <div className={styles.card}>
        <button onClick={(e) => handleClickDeleteCourse(e, id)} className={styles.btnDelete}>
          <MdOutlineDelete size={20} color="white" />
        </button>
        <div className={styles.text}>
          <span>Курс</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <img src={bg} className={styles.img} alt="" />
      </div>
    </Link>
  );
};

export default CardCours;
