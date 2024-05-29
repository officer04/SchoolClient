import styles from './CardChooseCours.module.scss';


const CardChooseCours = ({ id, title, description, handleCLickAddCours  }) => {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <span>Курс</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <p className={styles.text} onClick={() => handleCLickAddCours(id)}>Добавить курс пользователю</p>
    </div>
  );
};

export default CardChooseCours;
