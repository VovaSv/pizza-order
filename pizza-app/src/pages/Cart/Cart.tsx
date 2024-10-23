import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { API_URL_PREFIX } from '../../configs/API';
import styles from './Cart.module.css';

export default function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);


	useEffect(() => {
		const getItem = async (id: number) => {
			const { data } = await axios.get<Product>(`${API_URL_PREFIX}/products/${id}`)
			return data;
		}

		const getAllItems = async () => {
			const res = await Promise.all(items.map((item) => getItem(item.id)));
			setCardProducts(res);
		}
		getAllItems();

	}, [items])

	return (
		<div>
			<Heading className={styles['heading']}>Cart</Heading>
			{items?.map((item) => {
				const product = cartProducts.find((product) => product.id === item.id);
				if (!product) return;
				return <CartItem count={item.count} {...product} />

			})}
		</div>
	);
}
