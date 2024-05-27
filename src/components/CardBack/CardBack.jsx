const CardBack = ({ style, img, title, description }) => {
  return (
    <div className={style}>
      <img width={100} height={100} src={img} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardBack;
