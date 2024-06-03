import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import BurgerConstructorOrder from './burger-constructor-order/burger-constructor-order';
import styles from './burger-constructor.module.css';

import { addIngredient, deleteIngredient, setBun } from '../../services/slices/constructor-ingredients-list';

function BurgerConstructor() {
  const { bun, ingredients } = useSelector((store) => store.ingredientsList);
  const dispatch = useDispatch();

  const [, dropTargetBunUp] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(setBun(item));
    }
  });

  const [, dropTargetBunDown] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(setBun(item));
    }
  });

  const [, dropTarget] = useDrop({
    accept: ['sauce', 'main'],
    drop(item) {
      dispatch(addIngredient(item));
    }
  });

  const handleDeleteIngredient = (id) => {
    dispatch(deleteIngredient(id));
  };

  return (
    <section className={`${styles.section} mt-25`}>
      <div className={`${styles.burger}`}>
        <div ref={dropTargetBunUp}>
          {bun ? (
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${styles.ingredient} ml-8`}
            />
          ) : (
            <div className={`${styles.emptyElement} constructor-element constructor-element_pos_top ml-8`}>
              <div className={`${styles.emptyElementText} constructor-element__text`}>Перетащите сюда булку</div>
            </div>
          )}
        </div>

        <ul className={`${styles.scroll} mt-4 mb-4`} ref={dropTarget}>
          {ingredients.length > 0 ? (
            ingredients.map((item, index) => (
              <BurgerConstructorItem key={item.id} item={item} index={index} onDelete={handleDeleteIngredient} />
            ))
          ) : (
            <li className={`${styles.emptyElement} constructor-element constructor-element ml-8`}>
              <div className={`${styles.emptyElementText} constructor-element__text`}>Перетащите сюда ингредиенты</div>
            </li>
          )}
        </ul>

        <div ref={dropTargetBunDown}>
          {bun ? (
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${styles.ingredient} ml-8`}
            />
          ) : (
            <div className={`${styles.emptyElement} constructor-element constructor-element_pos_bottom ml-8`}>
              <div className={`${styles.emptyElementText} constructor-element__text`}>Перетащите сюда булку</div>
            </div>
          )}
        </div>
      </div>
      <BurgerConstructorOrder />
    </section>
  );
}

export default BurgerConstructor;
