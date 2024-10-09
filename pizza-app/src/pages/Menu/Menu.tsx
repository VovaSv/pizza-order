import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';
import { MenuList } from './MenuList/MenuList';
import { useFetchProducts } from '../../hooks';

export default function Menu() {
	const [products, isLoading, error] = useFetchProducts();
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
				<Search placeholder='Enter meal or ingerdients' />
			</div>
			<div>
				{error ? (
					error
				) : isLoading ? (
					Array.from({ length: 4 }, () => <ProductCardSkeleton />)
				) : (
					<MenuList products={products} />
				)}
			</div>
		</>
	);
}
