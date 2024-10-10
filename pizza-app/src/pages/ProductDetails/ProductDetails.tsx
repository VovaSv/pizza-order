import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export default function ProductDetails() {
	const data = useLoaderData() as { data: Product };
	return (
		<div>
			<Suspense fallback={<>Loading Route Defer Data</>}>
				<Await resolve={data.data}>
					{({ data }: { data: Product }) => <>`Product Details ${data.name}`</>}
				</Await>
			</Suspense>
		</div>
	);
}
