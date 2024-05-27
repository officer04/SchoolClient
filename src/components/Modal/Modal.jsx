import styles from './Modal.module.scss';

import { FiXSquare } from 'react-icons/fi';

const Modal = ({ setModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <button className={styles.square} onClick={() => setModal(false)}>
          <FiXSquare size={30} />
        </button>
        <h3 className={styles.title}>Оплата картой</h3>
        <div className={styles.info}>
          <div className={styles.group}>
            <p>Номер карты</p>
            <input className={styles.input} type="number" placeholder="Номер карты" />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.group}>
              <p>Срок действия</p>
              <input className={styles.input} type="number" placeholder="ММ/ГГ" />
            </div>
            <div className={styles.group}>
              <p>CVC</p>
              <input className={styles.input} type="number" placeholder="CVV/CVC" />
            </div>
          </div>
        </div>
        <button className={styles.btn}>Оплатить</button>
        <p className={styles.text}>Данные карты надёжно защищены</p>
      </div>
    </div>
  );
};

export default Modal;
