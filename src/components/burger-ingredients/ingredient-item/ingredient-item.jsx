import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { dataPropTypes } from '../../../utils/dataPropTypes';
import { useDispatch } from 'react-redux';
import { selectIngredient } from '../../../services/slices/ingredients-details';
import { useDrag } from 'react-dnd';

function IngredientItem(props) {
  const dispatch = useDispatch();

  function showModal() {
    dispatch(selectIngredient(props.data));
  }

  const [, dragRef] = useDrag({
    type: props.data.type,
    item: props.data
  });

  return (
    <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`} onClick={showModal} ref={dragRef}>
      <img className={`${styles['cardImage']} ml-4 mr-4 mb-1`} src={props.data.image} alt={props.data.name} />
      <div className={`${styles['cardPrice']} mb-1`}>
        <p className='text text_type_digits-default mr-2'> {props.data.price} </p>
        <CurrencyIcon type='primary' />
      </div>
      <div className={`${styles['cardTitle']} text text_type_main-default`}>{props.data.name}</div>
      {props.count > 0 && <Counter count={props.count} size='default' extraClass={styles.count} />}
    </li>
  );
}

IngredientItem.propTypes = {
  data: dataPropTypes.isRequired
};

export default IngredientItem;
