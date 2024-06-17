import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '../../components/hooks/useForm';
import Preloader from '../../components/preloader/preloader';
import { api } from '../../utils/api';
import { URL_LOGIN, URL_RESET_PASSWORD } from '../../utils/routes';

function ForgotPassword() {
  const [isFetch, setFetch] = useState(false);

  const navigate = useNavigate();

  const submitHandler = () => {
    setFetch(true);
    api.forgotPassword(state).then((res) => {
      if (res.success) {
        navigate(URL_RESET_PASSWORD);
      }
      setFetch(false);
    });
  };

  const { state, onChange, onSubmit } = useForm({ email: '' }, submitHandler);

  return (
    <main className='page-container mt-20'>
      <form onSubmit={onSubmit}>
        <p className='text text_type_main-medium'>Восстановление пароля</p>
        <EmailInput
          onChange={onChange}
          value={state.email}
          name={'email'}
          extraClass='mb-6 mt-6'
          errorText='Не верный формат адреса'
        />
        {isFetch ? (
          <>
            <Preloader />
          </>
        ) : (
          <Button htmlType='submit' type='primary' size='medium' disabled={state.email === ''}>
            Восстановить
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

export default ForgotPassword;
