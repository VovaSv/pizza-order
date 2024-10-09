import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Product } from '../interfaces/product.interface';
import { API_URL_PREFIX } from '../configs/API';

type UseFetchProductsResult = [Product[], boolean, string | undefined];

export const useFetchProducts = (): UseFetchProductsResult => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);

			// Mimic slow internet (for testing purposes)
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});

			const { data } = await axios.get<Product[]>(`${API_URL_PREFIX}/products`);
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

	useEffect(() => {
		getMenu();
	}, []);

	return [products, isLoading, error];
};
