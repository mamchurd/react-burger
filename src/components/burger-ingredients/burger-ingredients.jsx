import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './burger-ingredients.module.css';
import IngredientsGroup from './ingredients-group/ingredients-group';

import { getBuns, getMains, getSauces } from '../../services/selectors';
import { changeActiveTab } from '../../services/slices/tab-info';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const tabsRef = useRef();
  const bunGroupRef = useRef();
  const sauceGroupRef = useRef();
  const mainGroupRef = useRef();

  const { currentTab } = useSelector((store) => store.tabInfo);

  const buns = useSelector(getBuns);
  const sauces = useSelector(getSauces);
  const mains = useSelector(getMains);

  function handleScroll(event) {
    const tabsPosition = tabsRef.current.getBoundingClientRect().y;
    const bunGroupPosition = bunGroupRef.current.getBoundingClientRect().y;
    const sauceGroupPosition = sauceGroupRef.current.getBoundingClientRect().y;
    const mainGroupPosition = mainGroupRef.current.getBoundingClientRect().y;

    const closestTab = [
      {
        tab: 'bun',
        distance: Math.abs(tabsPosition - bunGroupPosition)
      },
      {
        tab: 'sauce',
        distance: Math.abs(tabsPosition - sauceGroupPosition)
      },
      {
        tab: 'main',
        distance: Math.abs(tabsPosition - mainGroupPosition)
      }
    ].reduce((acc, tab) => (acc.distance < tab.distance ? acc : tab));

    dispatch(changeActiveTab(closestTab.tab));
  }

  return (
    <section className={styles.section}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

      <div className={`${styles.tabs} mb-8`} ref={tabsRef}>
        <Tab value='bun' active={currentTab === 'bun'}>
          {' '}
          Булки{' '}
        </Tab>
        <Tab value='sauce' active={currentTab === 'sauce'}>
          {' '}
          Соусы{' '}
        </Tab>
        <Tab value='main' active={currentTab === 'main'}>
          {' '}
          Начинки{' '}
        </Tab>
      </div>

      <div className={styles.list} onScroll={handleScroll}>
        <div ref={bunGroupRef}>
          {' '}
          <IngredientsGroup name='Булки' data={buns} />{' '}
        </div>
        <div ref={sauceGroupRef}>
          {' '}
          <IngredientsGroup name='Соусы' data={sauces} />{' '}
        </div>
        <div ref={mainGroupRef}>
          {' '}
          <IngredientsGroup name='Начинки' data={mains} />{' '}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
