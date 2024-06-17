import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './ingredients-details.module.css';

function IngredientsDetails() {
  const { ingredientId } = useParams();

  const { data } = useSelector((store) => store.loadIngredients);

  const selectedItem = data.find((item) => item._id === ingredientId);

  return (
    <>
      {selectedItem === undefined ? (
        <></>
      ) : (
        <div className={styles.container}>
          <div>
            <img className={`${styles.image} mb-4`} src={selectedItem.image_large} alt='Изображение ингридиента' />
            <p className={`${styles.name} text text_type_main-medium mb-8`}>{selectedItem.name}</p>
            <div className={`${styles.detail} mb-15`}>
              <div className={styles['detailItem']}>
                <div className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</div>
                <div className='text text_type_digits-default text_color_inactive'>{selectedItem.calories}</div>
              </div>
              <div className={styles['detailItem']}>
                <div className='text text_type_main-default text_color_inactive mb-2'>Белки, г</div>
                <div className='text text_type_digits-default text_color_inactive'>{selectedItem.proteins}</div>
              </div>
              <div className={styles['detailItem']}>
                <div className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</div>
                <div className='text text_type_digits-default text_color_inactive'>{selectedItem.fat}</div>
              </div>
              <div className={styles['detailItem']}>
                <div className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</div>
                <div className='text text_type_digits-default text_color_inactive'>{selectedItem.carbohydrates}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IngredientsDetails;
