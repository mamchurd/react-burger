import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './ingredient-item.module.css';
import IngridientsDetails from "../ingridients-details/ingridients-details";
import { dataPropTypes } from "../../../utils/dataPropTypes";
import Modal from "../../modal/modal";
import { useModal } from "../../hooks/useModal";

function IngredientItem(props) {

    const {isModalOpen, openModal, closeModal} = useModal()

    return(
        <>
            <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`} onClick={openModal}>
                <img className={`${styles['cardImage']} ml-4 mr-4 mb-1`} src={props.data.image} alt={props.data.name}/>
                <div className={`${styles['cardPrice']} mb-1`}>
                    <p className="text text_type_digits-default mr-2"> {props.data.price} </p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${styles['cardTitle']} text text_type_main-default`}>{props.data.name}</div>  
                    
            </li>
            {isModalOpen && 
                    <Modal caption={'Детали ингридиента'} onClose={closeModal}>
                        <IngridientsDetails item={props.data}/>
                    </Modal>}
        </>
    )
}

IngredientItem.propTypes = {
    data: dataPropTypes.isRequired
}

export default IngredientItem