import { useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';

export default function ProductDetails() {
	const data = useLoaderData() as Product;
	return <div>{`Product Details ${data.name}`}</div>;
}
