import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '../../components/hooks/useForm';
import Preloader from '../../components/preloader/preloader';
import { api } from '../../utils/api';
import { URL_LOGIN } from '../../utils/routes';

function ResetPassword() {
  const navigate = useNavigate();

  const submitHandler = () => {
    api
      .resetPassword(state)
      .then((res) => {
        if (res.success) {
          navigate(URL_LOGIN, { replace: true });
        }
        setFetch(false);
      })
      .catch((error) => {
        setFetch(false);
        setError(error.message);
      });
  };

  const { state, isFetch, errorMessage, setFetch, setError, onChange, onSubmit } = useForm(
    {
      password: '',
      token: ''
    },
    submitHandler
  );

  return (
    <main className='page-container mt-20'>
      <form onSubmit={onSubmit}>
        <p className='text text_type_main-medium'>Восстановление пароля</p>
        <PasswordInput onChange={onChange} value={state.password} name={'password'} extraClass='mb-6 mt-6' />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={state.token}
          name={'token'}
          size={'default'}
          extraClass='mb-6 mt-6'
          error={errorMessage !== ''}
          errorText={errorMessage}
        />
        {isFetch ? (
          <Preloader />
        ) : (
          <Button htmlType='submit' type='primary' size='medium'>
            Сохранить
          </Button>
        )}
        <div className='page-footer mt-20'>
          <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
          <Link className='pageLink' to={URL_LOGIN}>
            <p className='text text_type_main-default'>Войти</p>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default ResetPassword;
