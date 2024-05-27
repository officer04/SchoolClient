import { useSelector } from 'react-redux';
import { FiXSquare } from 'react-icons/fi';
import laptop from './../../images/team-laptop-remote-working.svg';
import styles from './ModalChoice.module.scss';
import { Link} from 'react-router-dom';
import { ROUTES } from '../../utils/conts';


const ModalChoice = ({ setVisible }) => {
  const { user } = useSelector(({ auth }) => auth);

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <button className={styles.square} onClick={() => setVisible(false)}>
          <FiXSquare size={30} />
        </button>
        <h3 className={styles.title}>По результатам тестирования</h3>

        <div className={styles.info}>
          <p>Курс по фронтенд разработке вам больше подходит</p>
          <p>
            Но не переживайте, в процессе обучения или работы вы сможете всегда сменить направление
          </p>
          <img src={laptop} width={200}  />
          <Link to={ROUTES.FRONTEND} className={styles.button}>Перейти к курсу</Link>
        </div>
      </div>
    </div>
  );
};

export default ModalChoice;
