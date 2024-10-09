import styles from './ProductCardSkeleton.module.css';

export default function ProductCardSkeleton() {
	return (
		<div className={styles['card_container']}>
			<div
				className={`${styles['card_body']} ${styles['skeleton-body']}`}
			></div>
			<div className={`${styles['card_footer']} ${styles['skeleton-footer']}`}>
				<div className={styles['card_product-title']}></div>
				<div className={styles['card_product-description']}></div>
			</div>
		</div>
	);
}
