import { useSelector } from 'react-redux';

import styles from './home.module.css';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

const MESSAGE_LOADING = 'Подождите, идет загрузка...';
const MESSAGE_ERROR = 'Упс, у нас возникли технические неполадки :(';

function Home() {
  const { isLoading, isFailed } = useSelector((store) => store.loadIngredients);

  return (
    <>
      {isLoading || isFailed ? (
        <main className={styles.loading}>
          <p className='text text_type_main-large'>{isLoading ? MESSAGE_LOADING : MESSAGE_ERROR}</p>
        </main>
      ) : (
        <>
          <main className={styles.main}>
            <div className={styles.inner}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
