import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './personal-page.module.css';

import { logout } from '../../services/slices/auth';
import { URL_ORDERS_HISTORY } from '../../utils/routes';

function PersonalPage() {
  const dispatch = useDispatch();

  const exitButtonHandler = () => {
    dispatch(logout());
  };

  return (
    <main className='page-container page-container-profile mt-20'>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.li}>
            <NavLink to='' end>
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
                >
                  Профиль
                </span>
              )}
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink to={URL_ORDERS_HISTORY}>
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
                >
                  История заказов
                </span>
              )}
            </NavLink>
          </li>
          <li className={styles.li}>
            <Button
              htmlType='button'
              type='secondary'
              size='small'
              extraClass={styles['exit-button']}
              onClick={exitButtonHandler}
            >
              <span className='text text_type_main-medium text_color_inactive'>Выход</span>
            </Button>
          </li>
        </ul>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <Outlet />
    </main>
  );
}

export default PersonalPage;
