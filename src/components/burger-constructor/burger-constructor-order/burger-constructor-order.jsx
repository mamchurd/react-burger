import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import styles from './burger-constructor-order.module.css';

import { getUser } from '../../../services/slices/auth';
import { clearIngredientsList } from '../../../services/slices/constructor-ingredients-list';
import { clearOrder, fetchOrder } from '../../../services/slices/create-order';
import { URL_LOGIN } from '../../../utils/routes';
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';

function BurgerConstructorOrder() {
  const { bun, ingredients } = useSelector((store) => store.ingredientsList);
  const { orderNumber, isLoading, isError } = useSelector((store) => store.createOrder);
  const user = useSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    let sum = 0;
    if (bun) sum += bun.price * 2;

    sum += ingredients.reduce((sum, item) => sum + item.price, 0);

    return sum;
  }, [ingredients, bun]);

  const canCreateOrder = useMemo(() => bun && ingredients.length > 0, [ingredients, bun]);

  const handleCreateOrderClick = () => {
    if (!user) {
      navigate(URL_LOGIN, { replace: true });
    } else {
      if (canCreateOrder) {
        const orderIngredients = [bun, ...ingredients, bun];
        dispatch(fetchOrder(orderIngredients));
      }
    }
  };

  const handleCloseModal = () => {
    if (orderNumber) dispatch(clearIngredientsList());
    dispatch(clearOrder());
  };

  return (
    <div className={`${styles.total} mr-4 mt-10`}>
      <div className='text text_type_digits-medium mr-2 mb-1'>{totalPrice}</div>
      <div className={`${styles['total-icon']} mr-10`}>
        <CurrencyIcon type='primary' />
      </div>
      <Button htmlType='button' type='primary' onClick={handleCreateOrderClick}>
        Оформить заказ
      </Button>
      {(orderNumber || isLoading || isError) && (
        <Modal caption={''} onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructorOrder;
