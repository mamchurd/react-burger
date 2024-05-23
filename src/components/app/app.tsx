import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const MESSAGE_LOADING = 'Подождите, идет загрузка...';
const MESSAGE_ERROR = 'Упс, у нас возникли технические неполадки :(';
const URL_API = 'https://norma.nomoreparties.space/api/ingredients';

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
          <div id='modal'></div>
        </>
      }       
    </>
  );
}

async function dataLoad() {

  const res = await fetch(URL_API);
  if (res.status !== 200) {
    throw Error(`Неверный html-статус ответа: ${res.status}: ${res.statusText}`);
  }
  const res_1 = await res.json();
  if (!res_1.success) {
    throw Error('В json-ответе success !== true');
  }
  if (res_1.data && res_1.data.length > 0) {
    return Promise.resolve(res_1.data);
  }
  else {
    throw Error('возвращен пустой или некорректный набор данных');
  }

}

export default App;
