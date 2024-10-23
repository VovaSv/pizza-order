import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Product } from '../interfaces/product.interface';
import { API_URL_PREFIX } from '../configs/API';

type UseFetchProductsResult = [Product[] | null, boolean, string | undefined];

//This fetch example with dealy as use with debouncing which delay call of function
export const useFetchProducts = (productToSearch: string, delay: number = 0): UseFetchProductsResult => {
	const [products, setProducts] = useState<Product[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		const getMenu = async () => {
			setError(undefined);
			try {
				setIsLoading(true);

				// Mimic slow internet (for testing purposes)
				await new Promise<void>((resolve) => {
					setTimeout(() => {
						resolve();
					}, 2000);
				});
				const params: Record<string, any> = {};
				if (productToSearch) {
					params.name = productToSearch;  // Add `name` param only if productToSearch has a value
				}

				const { data } = await axios.get<Product[]>(`${API_URL_PREFIX}/products`, {
					params
				});
				setProducts(data);
			} catch (error) {
				console.error('API Call Failed: ', error);
				if (error instanceof AxiosError) {
					setError(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		const handler = setTimeout(() => {
			getMenu();
		}, delay);

		return () => {
			clearTimeout(handler); // Clear timeout if input changes before delay
		};
	}, [productToSearch]);

	return [products, isLoading, error];
};
