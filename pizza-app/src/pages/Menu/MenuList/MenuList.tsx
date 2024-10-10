import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

export function MenuList({ products }: MenuListProps) {
	return (
		<div className={styles.container}>
			{products?.map((product) => {
				return (
					<ProductCard
						id={product.id}
						key={product.id}
						name={product.name}
						descritpion={product.ingredients.join(', ')}
						image={product.image || '/product-1.png'}
						price={product.price}
						rating={product.rating}
					/>
				);
			})}
		</div>
	);
}
