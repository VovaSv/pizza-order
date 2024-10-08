import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

export default function Menu() {
	return (
		<>
			<div className={styles['head']}>
				<Heading>{'Menu'}</Heading>
				<Search placeholder='Enter meal or ingerdients' />
			</div>
			<div>
				<ProductCard
					id={1}
					descritpion='description'
					image='/product-1.png'
					price={300}
					rating={4.5}
					title='Title'
				/>
			</div>
		</>
	);
}
