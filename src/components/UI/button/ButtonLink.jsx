import { Link } from 'react-router-dom';
import styles from './ButtonLink.module.scss';

const ButtonLink = ({ children, styleWidth, stylePadding, ...props }) => {
  return (
    <Link className={`${styles.button} ${styleWidth} ${stylePadding}`} {...props}>
      {children}
    </Link>
  );
};

export default ButtonLink;
