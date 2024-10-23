import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';
import { MenuList } from './MenuList/MenuList';
import { useFetchProducts, useDebounce } from '../../hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function Menu() {
	const searchInputRef = useRef<HTMLInputElement | null>(null);
	const [searchValue, setSearchValue] = useState<string>('');
	//const debouncedSearchValue = useDebounce(searchValue, 300); This is another example of debouncing
	// we can debounce value and pass it to useFetchProducts | useFetchProducts(debouncedSearchValue, 400);
	const [products, isLoading, error] = useFetchProducts(searchValue, 400);

	useEffect(() => {
		console.log(searchInputRef?.current)
		searchInputRef?.current?.focus();
	}, [])

	const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	}
	// const [products, setProducts] = useState<Product[]>([]);
	// const [isLoading, setIsLoading] = useState<Boolean>(false);
	// const [error, setError] = useState<string | undefined>();

	// const getMenu = async () => {
	// 	try {
	// 		setIsLoading(true);
	// 		//mimic slow internet
	// 		await new Promise<void>((resolve) => {
	// 			setTimeout(() => {
	// 				resolve();
	// 			}, 2000);
	// 		});
	// 		const { data } = await axios.get<Product[]>(`${API_URL_PREFIX}/products`);
	// 		setProducts(data);
	// 		setIsLoading(false);
	// 	} catch (error) {
	// 		console.error('API Call Failed: ', error);
	// 		if (error instanceof AxiosError) {
	// 			setError(error.message);
	// 		}
	// 		setIsLoading(false);
	// 		return;
	// 	}
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
	//};

	// useEffect(() => {
	// 	getMenu();
	// }, []);

	// const getVisualData = () => {
	// 	return (
	// 		<>
	// 			{isLoading && Array.from({ length: 4 }, () => <ProductCardSkeleton />)}
	// 			{products?.map((product) => {
	// 				return (
	// 					<ProductCard
	// 						id={product.id}
	// 						key={product.id}
	// 						name={product.name}
	// 						descritpion={product.ingredients.join(', ')}
	// 						image={product.image || '/product-1.png'}
	// 						price={product.price}
	// 						rating={product.rating}
	// 					/>
	// 				);
	// 			})}
	// 		</>
	// 	);
	// };

	return (
		<>
			<div className={styles['head']}>
				<Heading>{'Menu'}</Heading>
				<Search placeholder='Enter meal or ingerdients' ref={searchInputRef} onChange={handleSearchInput} />
			</div>
			<div>
				{error ? (
					error
				) : isLoading ? (
					Array.from({ length: 4 }, (_, index) => (
						<ProductCardSkeleton key={index} />
					))
				) : products?.length ? (
					<MenuList products={products} />
				) : products?.length === 0 ?
					<>No product was found</> : ''}
			</div>
		</>
	);
}
