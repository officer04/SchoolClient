import styles from './Dropdown';
import { GoChevronDown } from 'react-icons/go';

const Dropdown = ({title, items=[], }) => {
  return (
    <>
      <div className={styles.dropDown}>
        <h3>{title}</h3>
        <label>
          <input type="text" />
        </label>
        <GoChevronDown />
      </div>

      {/* <ul className={styles.}>
        {items.map((item) => <li>{item}</li>)}
      </ul> */}
    </>
  );
};

export default Dropdown;
