import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AppRoutes from '../AppRoutes/AppRoutes';
import { getCards, getCoursInfoDate } from '../../featers/products/products';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getCards());
    dispath(getCoursInfoDate());
  }, []);
  return (
    <div className="App">
      <div className="container">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
