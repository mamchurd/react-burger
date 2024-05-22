import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './ingredient-item.module.css';
import PropTypes from 'prop-types';

function IngredientItem(props) {
    return(
        <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`}>
            <img className={`${styles['cardImage']} ml-4 mr-4 mb-1`} src={props.data.image} alt={props.data.name}/>
            <div className={`${styles['cardPrice']} mb-1`}>
                <p className="text text_type_digits-default mr-2"> {props.data.price} </p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles['cardTitle']} text text_type_main-default`}>{props.data.name}</div>
        </li>
    )
}

IngredientItem.prototype = {
    data: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    }).isRequired
}

export default IngredientItem