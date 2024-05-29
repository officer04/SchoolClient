import CardLearnMyCours from './../CardLearnMyCours/CardLearnMyCours';
import CardMyCours from './../CardMyCours/CardMyCours';

import styles from './SingleMyCours.module.scss';
import { Link, useParams } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import leftCircle from './../../../images/arrow-left-circle.svg';
import { ROUTES } from '../../../utils/conts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCours, getCoursModule, getCoursOne } from '../../../featers/cours/cours';

const SingleMyCours = () => {
  const dispatch = useDispatch();
  const { coursId } = useParams();
  const { modules, cours, isLoading } = useSelector(({ cours }) => cours);
  useEffect(() => {
    dispatch(getCoursModule(coursId));
    dispatch(getCoursOne(coursId));
  }, []);

  return (
    <div className={styles.singleMyCours}>
      <Link to={ROUTES.LIST_MY_COURS} className={styles.back}>
        <img src={leftCircle} alt="" />
        <p>Назад</p>
      </Link>
      <div className={styles.card}>
        {isLoading ? (
          <CardMyCours
            title={cours?.data?.title}
            description={cours?.data?.description}
            img={cours?.data?.imgUrl}
            style={styles.cardWidth}
            disable={false}
          />
        ) : (
          <ContentLoader
            speed={5}
            width={1020}
            height={172}
            viewBox="0 0 1020 172"
            backgroundColor="#a8a8a8"
            foregroundColor="#d9d9d9"
          >
            <rect x="0" y="2" rx="4" ry="4" width="1020" height="2" />
            <rect x="0" y="169" rx="4" ry="4" width="1020" height="2" />
            <rect x="910" y="40" rx="10" ry="10" width="80" height="70" />
            <rect x="20" y="41" rx="4" ry="4" width="65" height="18" />
            <rect x="20" y="70" rx="4" ry="4" width="124" height="18" />
            <rect x="20" y="99" rx="4" ry="4" width="70" height="18" />
            <rect x="20" y="17" rx="3" ry="3" width="25" height="6" />
            <rect x="20" y="147" rx="4" ry="4" width="88" height="6" />
          </ContentLoader>
        )}
      </div>
      <div className={styles.wrapper}>
        {isLoading
          ? modules.map((module) => (
              <CardLearnMyCours key={module._id} id={module._id} title={module.title} />
            ))
          : new Array(2).fill(0).map((_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                width={450}
                height={149}
                viewBox="0 0 450 149"
                backgroundColor="#a8a8a8"
                foregroundColor="#d9d9d9"
              >
                <rect x="10" y="127" rx="3" ry="3" width="100" height="4" />
                <rect x="0" y="1" rx="4" ry="4" width="322" height="2" />
                <rect x="10" y="22" rx="4" ry="4" width="270" height="20" />
                <rect x="10" y="105" rx="4" ry="4" width="20" height="10" />
                <rect x="0" y="143" rx="4" ry="4" width="322" height="2" />
              </ContentLoader>
            ))}
      </div>
    </div>
  );
};

export default SingleMyCours;
