import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './ingredients-group.module.css';

import { dataPropTypes } from '../../../utils/dataPropTypes';
import IngredientItem from '../ingredient-item/ingredient-item';

function IngredientsGroup(props) {
  const { bun, ingredients } = useSelector((store) => store.ingredientsList);

  const burgerData = useMemo(() => {
    const res = {};
    if (bun) res[bun._id] = 2;
    for (let item of ingredients) {
      if (!(item._id in res)) res[item._id] = 0;
      res[item._id]++;
    }
    return res;
  }, [bun, ingredients]);

  return (
    <div className='pt-5 pb-5'>
      <p className='text text_type_main-medium pb-6'> {props.name} </p>
      <ul className={styles.groupContent}>
        {props.data.map((ingredient) => (
          <IngredientItem key={ingredient._id} data={ingredient} count={burgerData[ingredient._id]} />
        ))}
      </ul>
    </div>
  );
}

IngredientsGroup.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataPropTypes)
};

export default IngredientsGroup;
