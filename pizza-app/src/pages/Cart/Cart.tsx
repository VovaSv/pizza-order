import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { API_URL_PREFIX } from '../../configs/API';

export default function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>();
	const items = useSelector((s: RootState) => s.cart.items);


	useEffect(() => {
		const getItem = async (id: number) => {
			const { data } = await axios.get(`${API_URL_PREFIX}/products/${id}`)
			return data;
		}

	}, [items])

	return (
		<div>
			<Heading>Cart</Heading>
			{items.map((item) => <CartItem />)}
		</div>
	);
}
