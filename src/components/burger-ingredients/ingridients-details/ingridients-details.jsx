import { useSelector } from 'react-redux';
import styles from './ingridients-details.module.css';

function IngridientsDetails() {
  const selectedItem = useSelector((store) => store.ingredientsDetail.selectedItem);

  return (
    <>
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
    </>
  );
}

export default IngridientsDetails;
