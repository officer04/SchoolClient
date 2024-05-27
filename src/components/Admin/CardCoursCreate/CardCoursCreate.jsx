import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { ROUTES } from '../../../utils/conts';

import styles from './CardCoursCreate.module.scss';

const CardCoursCreate = ({ ...props }) => {
  return (
    <Link {...props}>
      <FaPlus size={40} color="white" />
    </Link>
  );
};

export default CardCoursCreate;
