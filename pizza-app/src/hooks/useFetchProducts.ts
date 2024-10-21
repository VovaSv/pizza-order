import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Product } from '../interfaces/product.interface';
import { API_URL_PREFIX } from '../configs/API';

type UseFetchProductsResult = [Product[], boolean, string | undefined];

//This fetch example with dealy as use with debouncing which delay call of function
export const useFetchProducts = (productToSearch: string, delay: number = 0): UseFetchProductsResult => {
	const [products, setProducts] = useState<Product[]>([]);
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

				const { data } = await axios.get<Product[]>(`${API_URL_PREFIX}/products`, {
					params: {
						name: productToSearch ?? undefined
					}
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
