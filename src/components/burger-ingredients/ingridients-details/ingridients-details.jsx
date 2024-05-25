import { dataPropTypes } from "../../../utils/dataPropTypes"
import styles from './ingridients-details.module.css'

function IngridientsDetails(props){
    return(
        <>
            <img className={`${styles.image} mb-4`} src={props.item.image_large} alt="Изображение ингридиента" />
            <p className={`${styles.name} text text_type_main-medium mb-8`}>{props.item.name}</p>
            <div className={`${styles.detail} mb-15`}>
                <div className={styles['detailItem']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</div>
                    <div className="text text_type_digits-default text_color_inactive">{props.item.calories}</div>
                </div>
                <div className={styles['detailItem']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Белки, г</div>
                    <div className="text text_type_digits-default text_color_inactive">{props.item.proteins}</div>
                </div>
                <div className={styles['detailItem']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Жиры, г</div>
                    <div className="text text_type_digits-default text_color_inactive">{props.item.fat}</div>
                </div>
                <div className={styles['detailItem']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</div>
                    <div className="text text_type_digits-default text_color_inactive">{props.item.carbohydrates}</div>
                </div>
            </div>
        </>
    )

}

IngridientsDetails.PropsType = {
    item: dataPropTypes
}

export default IngridientsDetails