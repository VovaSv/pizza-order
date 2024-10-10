import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export default function ProductDetails() {
	const deferredData = useLoaderData() as { data: Product };
	return (
		<div>
			<Suspense fallback={<>Loading Route Defer Data</>}>
				<Await resolve={deferredData.data}>
					{(product: Product) => <>`Product Details ${product.name}`</>}
				</Await>
			</Suspense>
		</div>
	);
}
