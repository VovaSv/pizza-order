import React, { MouseEvent } from "react";
import { CartItemProps } from "./CartItem.props";
import styles from './CartItem.module.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/slices/cartSlice";
import cn from 'classnames';

const CartItem: React.FC<CartItemProps> = (props) => {
    const dispatch = useDispatch<AppDispatch>();

    const descrease = (e: MouseEvent) => {
        //dispatch(cartActions.removeItem(1));
    }

    const increase = (e: MouseEvent) => {
        dispatch(cartActions.addItem(props.id));
    }

    const remove = (e: MouseEvent) => {
        // dispatch(cartActions.addItem(1));
    }

    return (
        <div className={styles['cart_item-container']}>
            <div className={styles['cart_item-image']} style={{ backgroundImage: `url(${props.image})` }}></div>
            <div className={styles['cart_item-description']}>
                <div className={styles['cart_item-name']}>{props.name}</div>
                <div className={styles['cart_item-price']}>{props.price}&nbsp;$</div>
            </div>
            <div className={styles['cart_item-actions']}>
                <button className={cn(styles['card_item-button'])} onClick={descrease}>
                    <img src='/minus.svg' alt='Decrease' />
                </button>
                <div className={styles['item-counter']}>{props.count}</div>
                <button className={cn(styles['card_item-button'], styles['increase'])} onClick={increase}>
                    <img src='/plus.svg' alt='Increase' />
                </button>
                <button className={cn(styles['card_item-button'], styles['remove'])} onClick={remove}>
                    <img src='/delete.svg' alt='Remove' />
                </button>
            </div>
        </div>
    )

}

export default CartItem;