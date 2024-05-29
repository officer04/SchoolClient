import { Link, useLocation } from 'react-router-dom';

import styles from './Footer.module.scss';

import logo from './../../images/logo.svg';
import youtube from './../../images/youtube.svg';
import vk from './../../images/vk.svg';
import telegram from './../../images/telegram.svg';
import { ROUTES } from '../../utils/conts';

const Footer = () => {
  const location = useLocation()
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      {location.pathname === ROUTES.HOME  && (
        <nav className={styles.nav}>
          <Link to={ROUTES.COURS} className={styles.link}>
            Курсы
          </Link>
        </nav>
      )}

      <div className={styles.messenger}>
        <h3>Подпишитесь</h3>
        <ul>
          <li>
            <a href="https://www.youtube.com/channel/UCYyyaZ9slypV0MPj4ipqQCw">
              <img src={youtube} alt="youtube" />
            </a>
          </li>
          <li>
            <a href="https://vk.com/tema0412">
              <img src={vk} alt="vk" />
            </a>
          </li>
          <li>
            <a href="https://t.me/an_officer04">
              <img src={telegram} alt="telegram" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
