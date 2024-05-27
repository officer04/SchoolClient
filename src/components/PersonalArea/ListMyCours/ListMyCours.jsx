import styles from './ListMyCours.module.scss';

import CardMyCours from '../CardMyCours/CardMyCours';
import ContentLoader from 'react-content-loader';
import ModalAccount from '../../ModalAccount/ModalAccount';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCoursUser } from '../../../featers/cours/cours';

const ListMyCours = () => {
  const dispatch = useDispatch();
  const { isModalAccount } = useSelector(({ auth }) => auth);
  const { courses, isLoading } = useSelector(({ cours }) => cours);

  useEffect(() => {
    dispatch(getCoursUser());
  }, []);

  return (
    <div className={styles.ListMyCours}>
      {isModalAccount && <ModalAccount />}
      <h1 className={styles.title}>Список курсов</h1>
      {/* <nav className={styles.nav}>
        <ul>
          <li>Список моих курсов</li>
          <li>Магазин курсов</li>
        </ul>
      </nav> */}
      <div className={styles.wrapper}>
        {!courses.length && isLoading && <h2>К сожалению у вас пока не купленно никаких курсов</h2>}
        {isLoading
          ? courses.map((cours) => (
              <CardMyCours
                key={cours._id}
                id={cours._id}
                title={cours.title}
                description={cours.description}
                img={cours.imgUrl}
              />
            ))
          : new Array(4).fill(0).map((_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                width={400}
                height={166}
                viewBox="0 0 400 166"
                backgroundColor="#a8a8a8"
                foregroundColor="#d9d9d9"
              >
                <rect x="0" y="2" rx="4" ry="4" width="400" height="2" />
                <rect x="-3" y="164" rx="4" ry="4" width="400" height="2" />
                <rect x="20" y="23" rx="4" ry="4" width="25" height="5" />
                <rect x="20" y="140" rx="4" ry="4" width="88" height="6" />
                <rect x="295" y="48" rx="10" ry="10" width="80" height="70" />
                <rect x="20" y="74" rx="4" ry="4" width="124" height="15" />
                <rect x="20" y="101" rx="4" ry="4" width="70" height="15" />
                <rect x="20" y="48" rx="4" ry="4" width="65" height="15" />
              </ContentLoader>
            ))}
      </div>
    </div>
  );
};

export default ListMyCours;
