import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from 'react-redux';

import HeaderButton from './app-header-button/app-header-button';
import styles from './app-header.module.css';

import { getUser } from '../../services/slices/auth';
import { URL_HOME, URL_ORDERS, URL_PERSONAL_PAGE } from '../../utils/routes';

function AppHeader() {
  const user = useSelector(getUser);

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <nav className={styles.left}>
          <ul className={styles.list}>
            <li>
              <HeaderButton href={URL_HOME} icon={BurgerIcon}>
                Конструктор
              </HeaderButton>
            </li>
            <li>
              <HeaderButton href={URL_ORDERS} icon={ListIcon}>
                Лента заказов
              </HeaderButton>
            </li>
          </ul>
        </nav>

        <div className={styles.center}>
          <Logo />
        </div>

        <div className={styles.right}>
          <HeaderButton href={URL_PERSONAL_PAGE} icon={ProfileIcon}>
            {!user ? 'Личный кабинет' : user.name}
          </HeaderButton>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
