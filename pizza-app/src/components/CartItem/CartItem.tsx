import React, { MouseEvent } from "react";
import { CartItemProps } from "./CartItem.props";
import styles from './CartItem.module.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/slices/cartSlice";

const CartItem: React.FC<CartItemProps> = (props) => {
    const dispatch = useDispatch<AppDispatch>();

    const descrease = (e: MouseEvent) => {
        //dispatch(cartActions.removeItem(1));
    }

    const increase = (e: MouseEvent) => {
        //dispatch(cartActions.addItem(1));
    }

    const remove = (e: MouseEvent) => {
        // dispatch(cartActions.addItem(1));
    }

    return (
        <div className={styles['cart_item-container']}>
            <div className={styles['cart_item-body']}>
                <div className={styles['cart_item-image']} style={{ backgroundImage: `url(${props.image})` }}></div>
                <div className={styles['cart_item-description']}>
                    <div className={styles['cart_item-name']}>{props.name}</div>
                    <div className={styles['cart_item-currency']}>{props.price}&nbsp;$</div>
                </div>
                <div className={styles['cart_item-actions']}>
                    <button className={styles['card_item-descrease-button']} onClick={descrease}>
                        <img src='/add-to-card-icon.svg' alt='Decrease' />
                    </button>
                    <div>{props.count}</div>
                    <button className={styles['card_item-increase-button']} onClick={increase}>
                        <img src='/add-to-card-icon.svg' alt='Increase' />
                    </button>
                    <button className={styles['card_item-remove-button']} onClick={remove}>
                        <img src='/add-to-card-icon.svg' alt='Remove' />
                    </button>
                </div>
            </div>
        </div>
    )

}

export default CartItem;