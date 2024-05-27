import { useDispatch, useSelector } from 'react-redux';
import CardUser from '../CardUser/CardUser';
import styles from './UserList.module.scss';
import { useEffect } from 'react';
import { getAllUsers, deteteUserById } from '../../../featers/auth/auth';

const UserList = () => {
  const dispatch = useDispatch();
  const { isLoading, users } = useSelector(({ auth }) => auth);
  const handleClickDelete = (id) => {
    dispatch(deteteUserById(id)).then((response) => {
      if (response.payload?.status === 204) {
        dispatch(getAllUsers());
      }
    });
  };

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  return (
    <div className={styles.userList}>
      <h1 className={styles.title}>Пользователи, которые зарегистрированы на сайте</h1>
      <div className={styles.wrapper}>
        {isLoading ? (
          <h1 className={styles.title}>Loading...</h1>
        ) : (
          users.data.map((user) => (
            <CardUser key={user._id} id={user._id} username={user.username} email={user.email} handleClickDelete={handleClickDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
