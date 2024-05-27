import styles from './Program.module.scss';

const Program = ({ title, text1, text2, subtitle, menu, styleBg, styleBottomLine }) => {
  return (
    <div className={styles.program}>
      <h2 className={`${styles.title} ${styleBottomLine}`}>{title}</h2>
      <div className={styles.wrapper}>
        <div className={`${styles.text} ${styleBg}`}>
          <p>{text1}</p>
          <p>{text2}</p>
        </div>
        <div className={styles.list}>
          <h4 className={styles.subtitle}>{subtitle}</h4>
          <ul className={styles.menu}>
            {menu.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Program;
