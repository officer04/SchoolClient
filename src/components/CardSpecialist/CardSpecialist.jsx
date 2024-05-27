import React from 'react';

const CardSpecialist = ({img, text, styles}) => {
  return (
    <div className={styles}>
      <img src={img} alt="elips" />
      <div>{text}</div>
    </div>
  );
};

export default CardSpecialist;
