import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./burger-constructor.module.css"
import OrderDetails from "../order-details/order-details";
import { dataPropTypes } from "../../utils/dataPropTypes";
import PropTypes from 'prop-types';
import { useModal } from "../hooks/useModal";
import Modal from "../modal/modal";

function BurgerConstructor(props) {

  const bun = props.data.find(item => item.type === 'bun')
  const sum = 100;

  const {isModalOpen, openModal, closeModal} = useModal()

  return(
    <section className={`${styles.section} mt-25`}>
      <div className={`${styles.burger}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.ingredient} ml-8`}
        />

        <ul className={`${styles.scroll} mt-4 mb-4`}>
          {props.data.filter(item => item.type !== 'bun').map((item, index) => (
            <li className={`${styles['list-item']} mt-4`} key={index}>
              <span className={styles.draggable}><DragIcon type="primary" /></span>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                extraClass={`${styles.ingredient} ml-2`}
              />
            </li>
          ))}
        </ul>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.ingredient} ml-8`}
        />
      </div> 

      <div className={`${styles.total} mr-4 mt-10`}>
        <div className="text text_type_digits-medium mr-2 mb-1">{sum}</div>
        <div className={`${styles['total-icon']} mr-10`}><CurrencyIcon type="primary" /></div>
        <Button htmlType="button" type="primary" onClick={openModal}>Оформить заказ</Button>
      </div>
      {isModalOpen && 
        <Modal caption={''} onClose={closeModal}>
          <OrderDetails />
        </Modal>}
    </section>
  )
}

BurgerConstructor.propTypes ={
  data: PropTypes.arrayOf(dataPropTypes)
}

export default BurgerConstructor