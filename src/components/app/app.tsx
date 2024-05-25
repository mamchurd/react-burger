import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { dataLoad } from '../../utils/api';

const MESSAGE_LOADING = 'Подождите, идет загрузка...';
const MESSAGE_ERROR = 'Упс, у нас возникли технические неполадки :(';


function App() {

  const [state, setState] = useState({ data: null, isLoading: true, isError: false });

  useEffect(() => {
    dataLoad()
      .then(data => {
        setState({data: data, isLoading: false, isError: false})
      })
      .catch(e => {
        setState({data: null, isLoading: false, isError: true})
      });
  }, []);

  return (
    <>
      {(state.isLoading || state.isError) ? (
        <main className={styles.loading}>
          <p className="text text_type_main-large">
            {state.isLoading ? MESSAGE_LOADING : MESSAGE_ERROR}  
          </p>
        </main>
      ) : 
        <>
          <AppHeader/>
          <main className={styles.main}>
            <div className={styles.inner}>
              <BurgerIngredients data={state.data}/>
              <BurgerConstructor data={state.data}/>
            </div> 
          </main>
        </>
      }       
    </>
  );
}

export default App;
