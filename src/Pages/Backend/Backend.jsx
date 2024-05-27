import BaseInformation from '../../components/BaseInformation/BaseInformation';
import CardBack from '../../components/CardBack/CardBack';
import PriceCours from '../../components/PriceCours/PriceCours';
import ProgramsList from '../../components/ProgramsList/ProgramsList';
import Salary from '../../components/Salary/Salary';
import SpecialistBonus from '../../components/SpecialistBonus/SpecialistBonus';

import { useEffect } from 'react';

import {
  dataInfoCoursBack,
  dataInfoLearnBack,
  dataInfoProgramCoursBack,
  dataInfoBaseBack,
} from '../../utils/commom';

import styles from './Backend.module.scss';

const skillsItems = [
  '✓ Пользуйтесь льготами от российского правительства',
  '✓ Выберите одну из десятков сфер применения #C',
  '✓ Развивайтесь и получайте высокую зарплату',
  '✓ Работайте из любой точки мира',
];
const Backend = () => {
  useEffect(() => {
    // scrollIntoView({ behavior: 'smooth' });
    window.scroll(0, 0);
  });

  const scroll = (xp) => {
    window.scrollTo({
      top: 3300,
      behavior: 'smooth',
    });
  };
  return (
    <section>
      <BaseInformation
        title={dataInfoBaseBack[0].title}
        description={dataInfoBaseBack[0].description}
        titleColor={styles.titleColor}
        btnColor={styles.bg}
        scroll={scroll}
      />

      <div className={styles.learn}>
        <h1 className={styles.title}>
          Почему стоит <span>изучать #C</span>
        </h1>
        <div className={styles.wrapper}>
          {dataInfoLearnBack.map((obj) => (
            <CardBack
              key={obj.id}
              img={obj.img}
              title={obj.title}
              description={obj.description}
              style={styles.group}
            />
          ))}
        </div>
      </div>

      <div className={styles.cours}>
        <h1 className={styles.title}>
          Курс <span>предназначен для</span>
        </h1>
        <div className={styles.wrapper}>
          {dataInfoCoursBack.map((obj) => (
            <CardBack
              key={obj.id}
              img={obj.img}
              title={obj.title}
              description={obj.description}
              style={styles.card}
            />
          ))}
        </div>
      </div>

      <SpecialistBonus style={styles.bg} />

      <div className={styles.skills}>
        <h2 className={styles.title}>
          Станьте крепким специалистом — тем, кто отработал <span>навыки на реальных проектах</span>
        </h2>
        <ul className={styles.menu}>
          {skillsItems.map((obj, index) => (
            <li key={index} className={styles.item}>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      <Salary title='Backend' styleBg={styles.bg} styletitleColor={styles.titleColor} />

      <PriceCours btnColor={styles.btnColor} />

      <ProgramsList
        products={dataInfoProgramCoursBack}
        styleBg={styles.bg}
        styleBottomLine={styles.bottomLine}
      />
    </section>
  );
};

export default Backend;
