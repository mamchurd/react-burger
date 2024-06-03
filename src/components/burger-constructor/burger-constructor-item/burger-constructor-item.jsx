import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import { useDispatch } from 'react-redux';

import styles from './burger-constructor-item.module.css';

import { swapIngredientsPosition } from '../../../services/slices/constructor-ingredients-list';
import { dataPropTypes } from '../../../utils/dataPropTypes';

function BurgerConstructorItem({ index, item, onDelete }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        swapIngredientsPosition({
          toIndex: hoverIndex,
          fromIndex: dragIndex
        })
      );

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <li
      className={`${styles['list-item']} ${isDragging ? styles.dragging : ''} mt-4`}
      ref={ref}
      data-handler-id={handlerId}
    >
      <span className={styles.draggable}>
        <DragIcon type='primary' />
      </span>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => onDelete(item.id)}
        extraClass={`${styles.ingredient} ml-2`}
      />
    </li>
  );
}

BurgerConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: dataPropTypes.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default BurgerConstructorItem;
