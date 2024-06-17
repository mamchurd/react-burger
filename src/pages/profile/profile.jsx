import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile.module.css';

import { useForm } from '../../components/hooks/useForm';
import Preloader from '../../components/preloader/preloader';
import { getIsFetch, getUser, updateUser } from '../../services/slices/auth';

function Profile() {
  const user = useSelector(getUser);
  const isFetch = useSelector(getIsFetch);

  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(updateUser(state));
  };

  const { state, setState, onChange, onSubmit } = useForm({ ...user, password: '' }, submitHandler);

  const profileChanged = user.name !== state.name || user.email !== state.email || state.password.length > 0;

  const cancelEditHandler = () => {
    setState({ ...user, password: '' });
  };

  return (
    <form onSubmit={onSubmit}>
      <EmailInput
        placeholder='Имя'
        onChange={onChange}
        value={state.name}
        name={'name'}
        extraClass='mb-6'
        isIcon
        error={false}
      />
      <EmailInput name={'email'} onChange={onChange} value={state.email} extraClass='mb-6' isIcon />
      <PasswordInput name={'password'} onChange={onChange} value={state.password} extraClass='mb-6' icon='EditIcon' />
      {profileChanged &&
        (isFetch ? (
          <Preloader />
        ) : (
          <div className={styles.edit}>
            <Button htmlType='submit' type='primary' size='medium' extraClass='ml-2'>
              Сохранить
            </Button>
            <Button htmlType='button' onClick={cancelEditHandler} type='primary' size='medium' extraClass='ml-2'>
              Отмена
            </Button>
          </div>
        ))}
    </form>
  );
}

export default Profile;
