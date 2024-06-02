import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/slices/load-ingredients';

const MESSAGE_LOADING = 'Подождите, идет загрузка...';
const MESSAGE_ERROR = 'Упс, у нас возникли технические неполадки :(';


function App() {
 
  const { isLoading, isFailed} = useSelector(store => store.loadIngredients)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {(isLoading || isFailed) ? (
        <main className={styles.loading}>
          <p className="text text_type_main-large">
            {isLoading ? MESSAGE_LOADING : MESSAGE_ERROR}  
          </p>
        </main>
      ) : 
        <>
          <AppHeader/>
          <main className={styles.main}>
          <div className={styles.inner}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </div> 
          </main>
        </>
      }       
    </>
  );
}

export default App;
