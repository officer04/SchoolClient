import { useLocation } from 'react-router-dom';

import HeaderBase from './HeaderBase';
import HeaderAuth from './HeaderAuth';
import { useSelector } from 'react-redux';

const Header = () => {
  const { isAuth } = useSelector(({ auth }) => auth);
 
  const getHeader = () => {
    if( !isAuth) {
      return <HeaderBase/>
    } else {
      return <HeaderAuth/>
    }
  };

  return getHeader();
};

export default Header;
