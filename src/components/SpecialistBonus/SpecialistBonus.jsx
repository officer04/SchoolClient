import styles from './SpecialistBonus.module.scss';

import CardSpecialist from '../CardSpecialist/CardSpecialist';
import { dataSpecialist } from '../../utils/commom';

const SpecialistBonus = ({ style }) => {
  return (
    <div className={styles.specialist}>
      <h2>Станьте незаменимым специалистом</h2>
      <div  className={`${styles.body} ${style}`}>
        <h3>
          Для мотивирования молодых специалистов, государство делает различные льготы для
          специалистов:
        </h3>
        <div className={styles.wrapper}>
          {dataSpecialist.map((obj) => (
            <CardSpecialist key={obj.id} img={obj.img} text={obj.text} styles={styles.group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialistBonus;
