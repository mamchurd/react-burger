import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import IngredientsGroup from "./ingredients-group/ingredients-group"
import { data } from "../../utils/data"
import styles from './burger-ingredients.module.css'

function BurgerIngredients() {

    return(
        <section className={styles.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            
            <div className={`${styles.tabs} mb-8`}>
                <Tab value="bun">
                    Булки
                </Tab>
                <Tab value="sauce">
                    Соусы
                </Tab>
                <Tab value="main">
                    Начинки
                </Tab>
            </div>

            <div className={styles.list}>
                <IngredientsGroup name='Булки' data={data.filter(item => item.type==='bun')}/>
                <IngredientsGroup name='Соусы' data={data.filter(item => item.type==='sauce')}/>
                <IngredientsGroup name='Начинки' data={data.filter(item => item.type==='main')}/>
            </div>
        </section>
    )
}

export default BurgerIngredients