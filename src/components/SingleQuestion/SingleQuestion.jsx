import { Link } from 'react-router-dom';
import styles from './SingleQuestion.module.scss';
import { dataInfoQuestions } from '../../utils/commom';
import { useState } from 'react';
import ModalChoice from '../ModalChoice/ModalChoice';
import Button from '../UI/button/Button';

const SingleQuestion = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  document.title = 'Тест';

  const handleNext = () => {
    if (count === 9) {
      setVisible(true);
      return;
    }

    console.log('1');
    setCount((prev) => prev + 1);
    setValue((value.target.checked = false));
  };

  const handlePrev = () => {
    setCount((prev) => prev - 1);
  };
  return (
    <div className={styles.singleQuestion}>
      {visible && <ModalChoice setVisible={setVisible} />}
      <div className={styles.card}>
        <h1 className={styles.title}>{dataInfoQuestions[count].title}</h1>
        <div className={styles.wrapper}>
          {dataInfoQuestions[count].questions.map((obj, index) => (
            <div key={index} className={styles.group}>
              <label>
                <input type="radio" name="input" onChange={(e) => setValue(e)} />
                {obj}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.wrapperBtn}>
        <div className={styles.cardBtn}>
          <Button
            styleWidth={styles.btnWidth}
            onClick={handlePrev}
            disabled={count === 0 ? true : false}
          >
            Назад
          </Button>
          <p>{dataInfoQuestions[count].id}/10</p>
          <Button
            styleWidth={styles.btnWidth}
            onClick={handleNext}
            disabled={!value ? true : false}
          >
            {count === 9 ? 'Завершить' : 'Вперёд'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
