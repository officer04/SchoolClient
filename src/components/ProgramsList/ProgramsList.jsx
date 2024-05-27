import Program from '../Program/Program';

import styles from './ProgramsList.module.scss';

import { dataInfoProgramCoursFront } from '../../utils/commom';

const ProgramsList = ({products, styleBg, styleBottomLine}) => {
  return (
    <div className={styles.programsList}>
      <h1 className={styles.title}>Программа курса</h1>
      {products.map((obj) => (
        <Program
          key={obj.id}
          title={obj.title}
          text1={obj.text1}
          text2={obj.text2}
          subtitle={obj.subtitle}
          menu={obj.menu}
          styleBg={styleBg}
          styleBottomLine={styleBottomLine}
        />
      ))}
    </div>
  );
};

export default ProgramsList;
