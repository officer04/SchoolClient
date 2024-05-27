import working from './../../images/working.svg';
import moneyBag from './../../images/money-bag.svg';
import bookshelfLibrary from './../../images/bookshelf-library.svg';

import { Link, Outlet } from 'react-router-dom';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <section>
      <div className={styles.InfoBanner}>
        <h1 className={styles.title}>Сделаем так, чтобы hr-менеджеры стояли за вами в очереди</h1>
        <Link to="/cours" className={styles.btn}>
          Начать учиться
        </Link>
      </div>

      <div className={styles.direction}>
        <div className={styles.title}>
          <h1>Мы научим думать, анализировать, создавать, архитектуру.</h1>
          <p>Ты освоишь:</p>
        </div>
        <div className={styles.group}>
          <h3>Бекенд</h3>
          <p>
            Специалист, который заинтересован в создании и поддержке невидимой, но необходимой части
            веб-приложений и систем. Бэкенд разработчик – это профессионал, который отвечает за
            обработку данных, взаимодействие с базой данных и создание надежных и безопасных
            серверных компонентов.
          </p>
        </div>
        <div className={styles.group}>
          <h3>Фронтенд</h3>
          <p>
            Специалист, который занимается созданием пользовательского интерфейса веб-приложений и
            веб-сайтов. Он отвечает за верстку и программирование клиентской части проекта, которая
            видна и взаимодействует с пользователями.
          </p>
        </div>
      </div>

      <div className={styles.coursesBanner}>
        <h2 className={styles.title}>Курсы подойдут вам, если</h2>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <img src={bookshelfLibrary} alt="" />
            <p>
              Вы уже пробовали учиться самостоятельно но вам нужна помощь и обратная связь от
              опытного преподавателя
            </p>
          </div>
          <div className={styles.card}>
            <img src={working} alt="" />
            <p>Вы уже работаете в IT, но на другом направлении</p>
          </div>
          <div className={styles.card}>
            <img src={moneyBag} alt="" />
            <p>
              Вы хотите обучаться системно, чтобы все что нужна для работы разработчиком, было
              доступно в одном месте
            </p>
          </div>
        </div>
      </div>
      <Outlet />
      {/* <div className={styles.connection}>
        <div className={styles.text}>
          <h1>Запросить полную и подробную программу курса</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.input}>
            <input type="text" placeholder="Имя" />
          </div>
          <div className={styles.input}>
            <input type="email" placeholder="Почта" />
          </div>
          <button className={styles.btn}>Отправить</button>
        </div>
      </div> */}
    </section>
  );
};

export default Home;
