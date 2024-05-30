import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../order-details/order-details";
import Modal from "../../modal/modal";
import styles from "./burger-cinstuctor-order.module.css"
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrder, fetchOrder } from "../../../services/slices/create-order";
import { showModal } from "../../../services/selectors";

function BurgerConstructorOrder() {

    const { bun, ingredients } = useSelector(store => store.ingredientsList)
    const showOrderDetail = useSelector(showModal)

    const dispatch = useDispatch()

    const totalPrice = useMemo(() => {
        let sum = 0
        if (bun)
          sum += bun.price * 2
    
        sum += ingredients.reduce((sum, item) => sum + item.price, 0)
    
        return sum
    }, [ingredients, bun])

    const canCreateOrder = useMemo(() => bun && ingredients.length > 0
    , [ingredients, bun])

    const handleCreateOrderClick = () => {
        if(canCreateOrder) {
            const orderIngredients = [...ingredients]
            orderIngredients.unshift(bun)
            orderIngredients.push(bun)
            dispatch(fetchOrder(orderIngredients))
        }
    }

    const habdleCloseModal = () => {
        dispatch(clearOrder())
    }
    
    return (
        <div className={`${styles.total} mr-4 mt-10`}>
            <div className="text text_type_digits-medium mr-2 mb-1">{totalPrice}</div>
            <div className={`${styles['total-icon']} mr-10`}><CurrencyIcon type="primary" /></div>
            <Button htmlType="button" type="primary" onClick={handleCreateOrderClick}>Оформить заказ</Button>  
        {showOrderDetail && 
            <Modal caption={''} onClose={habdleCloseModal}>
                <OrderDetails />
            </Modal>}
        </div>
    )
}

export default BurgerConstructorOrder