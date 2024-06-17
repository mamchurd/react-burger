import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag } from 'react-dnd';

import { Link, useLocation } from 'react-router-dom';

import styles from './ingredient-item.module.css';

import { dataPropTypes } from '../../../utils/dataPropTypes';

function IngredientItem(props) {
  const location = useLocation();

  const ingredientId = props.data['_id'];

  const [, dragRef] = useDrag({
    type: props.data.type,
    item: props.data
  });

  return (
    <Link
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
      className={styles.link}
    >
      <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`} ref={dragRef}>
        <img className={`${styles['cardImage']} ml-4 mr-4 mb-1`} src={props.data.image} alt={props.data.name} />
        <div className={`${styles['cardPrice']} mb-1`}>
          <p className='text text_type_digits-default mr-2'> {props.data.price} </p>
          <CurrencyIcon type='primary' />
        </div>
        <div className={`${styles['cardTitle']} text text_type_main-default`}>{props.data.name}</div>
        {props.count > 0 && <Counter count={props.count} size='default' extraClass={styles.count} />}
      </li>
    </Link>
  );
}

IngredientItem.propTypes = {
  data: dataPropTypes.isRequired
};

export default IngredientItem;
