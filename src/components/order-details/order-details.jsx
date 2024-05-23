import Modal from "../modal/modal"
import styles from "./order-details.module.css"
import img from "../../images/image.png"
import PropTypes from 'prop-types';

function OrderDetails(porps) {
    return(
        <Modal caption={''} onClose={porps.onClose}>
            <p className="text text_type_digits-large">034536</p>
            <p className={`${styles.centreContent} text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <div className={styles.centreContent}>
                <img src={img} alt="" className={`${styles.centreContetnt} mt-15 mb-15`}></img>
            </div>
            <p className={`${styles.centreContent} text text_type_main-small mb-2`}>Ваш заказ начали готовить</p>
            <p className={`${styles.centreContent} text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
        </Modal>
    )
}

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default  OrderDetails