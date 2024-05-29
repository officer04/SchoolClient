import styles from './CardUser.module.scss';
import { MdOutlineDelete } from 'react-icons/md';
import { deteteUserById, getAllUsers } from './../../../featers/auth/auth';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/conts';

const CardUser = ({ id, username, email, handleClickDelete }) => {
  console.log(id);
  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <Link to={`${ROUTES.CHOOSE_COURS_ADMIN}/${id}`}>
          <p className={styles.update}>Выдать курс</p>
        </Link>
        <MdOutlineDelete
          size={20}
          className={styles.delete}
          onClick={() => handleClickDelete(id)}
        />
      </div>
      <div className={styles.text}>
        <h2>Информаиця о пользователи</h2>
        <p>Имя: {username}</p>
        <p>Почта: {email}</p>
      </div>
    </div>
  );
};

export default CardUser;
