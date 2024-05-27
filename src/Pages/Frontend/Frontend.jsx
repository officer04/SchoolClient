import styles from './Fronted.module.scss';

import { useEffect } from 'react';

import Salary from '../../components/Salary/Salary';
import BaseInformation from '../../components/BaseInformation/BaseInformation';
import ProgramsList from '../../components/ProgramsList/ProgramsList';
import SpecialistBonus from '../../components/SpecialistBonus/SpecialistBonus';
import CardFront from '../../components/CardFront/CardFront';
import PriceCours from '../../components/PriceCours/PriceCours';

import {
  dataInfoCoursFront,
  dataInfoProgramCoursFront,
  dataInfoBaseFront,
} from '../../utils/commom';
import { dataInfoLearnFront } from '../../utils/commom';

const Frontend = () => {
  useEffect(() => {
    window.scroll(0, 0);
  });

  const scroll = (xp) => {
    window.scrollTo({
      top: 3000,
      behavior: 'smooth',
    });
  };
  
  return (
    <div>
      <BaseInformation
        title={dataInfoBaseFront[0].title}
        description={dataInfoBaseFront[0].description}
        titleColor={styles.titleColor}
        btnColor={styles.bg}
        scroll={scroll}
      />

      <div className={styles.infoFront}>
        <h1 className={styles.title}>
          Кто такой <span>Frontend-разработчик</span>
        </h1>
        <div className={styles.text}>
          <p>
            Frontend-разработчик программирует внешнюю сторону сайта — то, с чем соприкасается
            пользователь. Для этого нужно уметь создавать HTML-страницы и хорошо знать язык
            программирования JavaScript.
          </p>
        </div>
      </div>

      <div className={styles.cours}>
        <h2>Для кого курс</h2>
        <div className={styles.wrapper}>
          {dataInfoCoursFront.map((obj) => (
            <CardFront
              key={obj.id}
              title={obj.title}
              description={obj.description}
              className={styles.group}
            />
          ))}
        </div>
      </div>

      <SpecialistBonus style={styles.bg} />

      <div className={styles.learn}>
        <h2 className={styles.title}>
          Чему вы <span>научитесь</span>
        </h2>
        <div className={styles.wrapper}>
          {dataInfoLearnFront.map((obj) => (
            <CardFront
              key={obj.id}
              title={obj.title}
              description={obj.description}
              className={styles.card}
            />
          ))}
        </div>
      </div>

      <Salary title='Frontend' styleBg={styles.bg} styleTitleColor={styles.titleColor} />

      <div className={styles.feedback}>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <h1>Сомневаетесь в выборе?</h1>
            <p>Выслушаем, порекомендуем и поможем выбрать направление обучения</p>
          </div>
          <div className={styles.button}>
            <button>Получить консультацию</button>
          </div>
        </div>
      </div>

      <PriceCours btnColor={styles.btnColor}  />
      
      <ProgramsList
        products={dataInfoProgramCoursFront}
        styleBg={styles.bg}
        styleBottomLine={styles.bottomLine}
      />
    </div>
  );
};

export default Frontend;
