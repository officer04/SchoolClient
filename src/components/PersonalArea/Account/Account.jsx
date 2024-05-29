import styles from './Account.module.scss';
import bg from './../../../images/bg.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/conts';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ModalAccount from '../../ModalAccount/ModalAccount';
import ButtonLink from '../../UI/button/ButtonLink';

const Account = () => {
  const { isModalAccount } = useSelector(({ auth }) => auth);

  return (
    <div className={styles.account}>
      {isModalAccount && <ModalAccount />}
      <div className={styles.text}>
        <h1>Не знаете с чего начать?</h1>
        <p>Откройте для себя что-то новое, пройдите тест и решите какой курс подойдёт именно вам</p>
        <ButtonLink to={ROUTES.SINGLE_QUESTION} styleWidth={styles.btnWidth}>Тык сюда</ButtonLink>
      </div>
      <div>
        <img className={styles.img} src={bg} alt="" />
      </div>
    </div>
  );
};

export default Account;
