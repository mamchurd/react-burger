import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../components/hooks/useForm';
import Preloader from '../../components/preloader/preloader';
import { getIsFetch, register } from '../../services/slices/auth';
import { URL_LOGIN } from '../../utils/routes';

function Register() {
  const dispatch = useDispatch();
  const isFetch = useSelector(getIsFetch);

  const submitHandler = (e) => {
    dispatch(register(state));
  };

  const { state, onChange, onSubmit } = useForm(
    {
      name: '',
      email: '',
      password: ''
    },
    submitHandler
  );

  return (
    <main className='page-container mt-20'>
      <form onSubmit={onSubmit}>
        <p className='text text_type_main-medium'>Регистрация</p>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={state.name}
          name={'name'}
          size={'default'}
          extraClass='mt-6'
        />
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
          <Button htmlType='submit' type='primary' size='medium' extraClass='mb-10'>
            Зарегистрироваться
          </Button>
        )}
        <div className='page-footer mt-4'>
          <p className='text text_type_main-default text_color_inactive '>Уже зарегистрированы?</p>
          <Link className='pageLink' to={URL_LOGIN}>
            <p className='text text_type_main-default'>Войти</p>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Register;
