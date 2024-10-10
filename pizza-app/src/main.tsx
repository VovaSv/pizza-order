import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import CartPage from './pages/Cart/Cart.tsx';
//import MenuPage from './pages/Menu/Menu.tsx';
import LeftPanelLayout from './layouts/LeftPanel/LeftPanel.tsx';
import ErrorPage from './pages/Error/Error.tsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.tsx';
import axios from 'axios';
import { API_URL_PREFIX } from './configs/API';

// Each lazy loaded component should be inside <suspense>
const MenuPage = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <LeftPanelLayout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Loading...</>}>
						<MenuPage />
					</Suspense>
				),
			},
			{
				path: '/cart',
				element: <CartPage />,
			},
			{
				path: '/product/:id',
				element: <ProductDetails />,
				errorElement: <>Failure catched by Error Element Component</>,
				loader: async ({ params }) => {
					// Mimic slow internet (for testing purposes)
					// await new Promise<void>((resolve) => {
					// 	setTimeout(() => {
					// 		resolve();
					// 	}, 2000);
					// });
					// const { data } = await axios.get(
					// 	`${API_URL_PREFIX}/products/${params.id}`
					// );
					// return data;
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios
									.get(`${API_URL_PREFIX}/products/${params.id}`)
									.then((res) => resolve(res.data))
									.catch((err) => reject(err));
							}, 2000);
						}),
					});
				},
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
