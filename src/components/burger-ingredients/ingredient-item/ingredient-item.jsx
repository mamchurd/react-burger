import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './ingredient-item.module.css';
import { useState } from "react";
import IngridientsDetails from "../ingridients-details/ingridients-details";
import { dataPropTypes } from "../../../utils/dataPropTypes";

function IngredientItem(props) {

    const [dialogVisible, setVisible] = useState(false)

    function ShowDialog() {
         setVisible(true);
    }

    function HideDialog(e) {
        setVisible(false);
        e.stopPropagation();
    }

    return(
        <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`} onClick={ShowDialog}>
            <img className={`${styles['cardImage']} ml-4 mr-4 mb-1`} src={props.data.image} alt={props.data.name}/>
            <div className={`${styles['cardPrice']} mb-1`}>
                <p className="text text_type_digits-default mr-2"> {props.data.price} </p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles['cardTitle']} text text_type_main-default`}>{props.data.name}</div>
            {dialogVisible && <IngridientsDetails item={props.data} onClose={HideDialog}/>}
        </li>
    )
}

IngredientItem.prototype = {
    data: dataPropTypes.isRequired
}

export default IngredientItem