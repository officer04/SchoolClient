import styles from './Button.module.scss';

const Button = ({ children, styleWidth, ...props }) => {
  return (
    <button className={`${styles.button} ${styleWidth}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
