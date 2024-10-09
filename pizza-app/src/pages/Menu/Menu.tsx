import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { API_URL_PREFIX } from '../../configs/API';
import { Product } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';

export default function Menu() {
	const [products, setProducts] = useState<Product[]>([]);

	const [isLoading, setIsLoading] = useState<Boolean>(false);

	const getMenu = async () => {
		try {
			setIsLoading(true);
			//mimic slow internet
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			const { data } = await axios.get<Product[]>(`${API_URL_PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (error) {
			console.error('API Call Failed: ', error);
			setIsLoading(false);
			return;
		}
		// try {
		// 	const res = await fetch(`${API_URL_PREFIX}/products`);
		// 	if (!res.ok) {
		// 		return;
		// 	}
		// 	const data = (await res.json()) as Product[];
		// 	setProducts(data);
		// } catch (error) {
		// 	console.error('API Call Failed: ', error);
		// }
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
				<ProductCardSkeleton />
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
