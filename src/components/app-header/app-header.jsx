import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import HeaderButton from './app-header-button/app-header-button';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <nav className={styles.left}>
          <ul className={styles.list}>
            <li>
              <HeaderButton href='/' icon={BurgerIcon} isActive>
                Конструктор
              </HeaderButton>
            </li>
            <li>
              <HeaderButton href='/' icon={ListIcon}>
                Лента заказов
              </HeaderButton>
            </li>
          </ul>
        </nav>

        <div className={styles.center}>
          <Logo />
        </div>

        <div className={styles.right}>
          <HeaderButton href='/' icon={ProfileIcon}>
            Личный кабинет
          </HeaderButton>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
