import styles from "./order-details.module.css"
import img from "../../images/image.png"

function OrderDetails(porps) {
    return(
        <>
            <p className="text text_type_digits-large">034536</p>
            <p className={`${styles.centreContent} text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <div className={styles.centreContent}>
                <img src={img} alt="" className={`${styles.centreContetnt} mt-15 mb-15`}></img>
            </div>
            <p className={`${styles.centreContent} text text_type_main-small mb-2`}>Ваш заказ начали готовить</p>
            <p className={`${styles.centreContent} text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

OrderDetails.propTypes = {
    
}

export default  OrderDetails