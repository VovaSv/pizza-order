import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/slices/cartSlice';

export default function ProductCard(props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const addToCart = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.addItem(props.id))
	}
	return (
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card_container']}>
				<div
					className={styles['card_body']}
					style={{ backgroundImage: `url(${props.image})` }}
				>
					<div className={styles['card_product-price']}>
						{props.price}&nbsp;
						<span className={styles['card_product-currency']}>$</span>
					</div>
					<button className={styles['card_add-to-button']} onClick={addToCart}>
						<img src='/add-to-card-icon.svg' alt='' />
					</button>
					<div className={styles['card_product-rating']}>
						{props.rating}&nbsp;
						<img src='/rating-icon.svg' alt='' />
					</div>
				</div>
				<div className={styles['card_footer']}>
					<div className={styles['card_product-title']}>{props.name}</div>
					<div className={styles['card_product-description']}>
						{props.descritpion}
					</div>
				</div>
			</div>
		</Link>
	);
}
