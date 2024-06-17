import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../components/hooks/useForm';
import Preloader from '../../components/preloader/preloader';
import { getIsFetch, login } from '../../services/slices/auth';
import { URL_FORGOT_PASSWORD, URL_REGISTER } from '../../utils/routes';

function Login() {
  const dispatch = useDispatch();
  const isFetch = useSelector(getIsFetch);

  const submitHandler = (e) => {
    dispatch(login(state));
  };

  const { state, onChange, onSubmit } = useForm(
    {
      email: '',
      password: ''
    },
    submitHandler
  );

  return (
    <main className='page-container mt-20'>
      <form onSubmit={onSubmit}>
        <p className='text text_type_main-medium'>Вход</p>
        <EmailInput
          onChange={onChange}
          value={state.email}
          name={'email'}
          extraClass='mb-6 mt-6'
          errorText='Не верный формат адреса'
        />
        <PasswordInput onChange={onChange} value={state.password} name={'password'} extraClass='mb-6' />
        {isFetch ? (
          <Preloader />
        ) : (
          <Button htmlType='submit' type='primary' size='medium'>
            Войти
          </Button>
        )}
        <div className='page-footer mt-20'>
          <p className='text text_type_main-default text_color_inactive'>Вы - новый пользователь?</p>
          <Link className='pageLink' to={URL_REGISTER}>
            <p className='text text_type_main-default'>Зарегистрироваться</p>
          </Link>
        </div>
        <div className='page-footer mt-4'>
          <p className='text text_type_main-default text_color_inactive '>Забыли пароль?</p>
          <Link className='pageLink' to={URL_FORGOT_PASSWORD}>
            <p className='text text_type_main-default'>Восстановить пароль</p>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Login;
