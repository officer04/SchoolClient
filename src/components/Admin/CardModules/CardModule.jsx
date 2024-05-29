import styles from './CardModule.module.scss';

import { ROUTES } from '../../../utils/conts';

import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CardModule = ({ title, id, handleClickDeleteCourse }) => {
  return (
    <Link to={`${ROUTES.CHANGE_MODULE}/${id}`} className={styles.cardLearnMyCours}>
      <div className={styles.wrapper}>
        <button onClick={(e) => handleClickDeleteCourse(e, id)} className={styles.btnDelete}>
          <MdOutlineDelete size={20} color="white" />
        </button>
        <h3>{title}</h3>
        <div>
          {/* <p>100%</p> */}
          <div className={styles.prograss} />
        </div>
      </div>
    </Link>
  );
};

export default CardModule;
