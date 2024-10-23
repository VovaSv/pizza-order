import { useEffect, useMemo, useState, useCallback } from 'react';
import Heading from '../../components/Heading/Heading';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { API_URL_PREFIX } from '../../configs/API';
import styles from './Cart.module.css';

const DELIVERY_FEE = 160;

export default function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);

	const renderItems = () => {
		return items?.map((item) => {
			const product = cartProducts.find((product) => product.id === item.id);
			if (!product) return;
			return <CartItem key={item.id} count={item.count} {...product} />
		})
	}

	const memoizedCallback = useCallback(() => {
		return items.map((item) => {
			const product = cartProducts.find((product) => product.id === item.id);
			if (!product) return 0;
			return product.price * item.count
		}).reduce((acc, price) => acc + price, 0)
	}, [items, cartProducts]);
	/*
		const getSummary = () => {
			return items.map((item) => {
				const product = cartProducts.find((product) => product.id === item.id);
				if (!product) return 0;
				return product.price * item.count
			}).reduce((acc, price) => acc + price, 0)
		}
		*/

	//Here useMemo redundent as we laready memo function above but for demonstration can be nice.	
	const memoizedSummary = useMemo(() => memoizedCallback(), [items, cartProducts])



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
			{renderItems()}
			<div className={styles['line']}>
				<div className={styles['text']}>Summary</div>
				<div className={styles['price']}>{memoizedSummary}<span className={styles['currency']}>&nbsp;$</span></div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Delivery</div>
				<div className={styles['price']}>{DELIVERY_FEE}<span className={styles['currency']}>&nbsp;$</span></div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Total</div>
				<div className={styles['price']}>{memoizedSummary + DELIVERY_FEE}<span className={styles['currency']}>&nbsp;$</span></div>
			</div>
		</div>
	);
}
