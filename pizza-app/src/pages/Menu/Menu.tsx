import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { API_URL_PREFIX } from '../../configs/API';
import { Product } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';

export default function Menu() {
	const [products, setProducts] = useState<Product[]>([]);

	const getMenu = async () => {
		try {
			const res = await fetch(`${API_URL_PREFIX}/products`);
			if (!res.ok) {
				return;
			}
			const data = (await res.json()) as Product[];
			setProducts(data);
		} catch (error) {
			console.error('API Call Failed: ', error);
		}
	};

	useEffect(() => {
		getMenu();
	}, []);
	return (
		<>
			<div className={styles['head']}>
				<Heading>{'Menu'}</Heading>
				<Search placeholder='Enter meal or ingerdients' />
			</div>
			<div>
				{products.map((product) => {
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
		</>
	);
}
