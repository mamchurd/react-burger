import styles from "./order-details.module.css"
import img from "../../images/image.png"
import loading from "../../images/loading.gif"
import { useSelector } from "react-redux"

function OrderDetails() {
    const { orderNumber, isLoading, isError } = useSelector(store => store.createOrder)

    return(
        <>
            {isLoading ? 
                <div>
                    <p className={`${styles.centreContent} text text_type_main-medium mt-8`}>Ещё секундочку, отправляем заказ на кухню</p>
                    <div className={styles.centreContent}>
                        <img src={loading} alt="" className={`${styles.centreContetnt} mb-15`}></img>
                    </div>
                   
                </div> : isError ? 
                <div>
                    <p className={`${styles.centreContent} text text_type_main-medium mt-8`}>При отправке заказа на кухню возникла ошибка :(</p>
                </div> : 
                <div>
                <p className={`${styles.centreContent} text text_type_digits-large`}>{orderNumber}</p>
                <p className={`${styles.centreContent} text text_type_main-medium mt-8`}>идентификатор заказа</p>
                <div className={styles.centreContent}>
                    <img src={img} alt="" className={`${styles.centreContetnt} mt-15 mb-15`}></img>
                </div>
                <p className={`${styles.centreContent} text text_type_main-small mb-2`}>Ваш заказ начали готовить</p>
                <p className={`${styles.centreContent} text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        }
       </>     
    )
}

export default  OrderDetails