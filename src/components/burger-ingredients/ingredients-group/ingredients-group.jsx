import IngredientItem from "../ingredient-item/ingredient-item"
import styles from "./ingredients-group.module.css"

function IngredientsGroup(props) {
    return(
        <div className="pt-5 pb-5">
            <p className="text text_type_main-medium pb-6"> {props.name} </p>
            <ul className={styles.groupContent}>
                {props.data.map((ingridient) => <IngredientItem key={ingridient._id} data={ingridient} />)}
            </ul>  
        </div>
    )
}

export default IngredientsGroup