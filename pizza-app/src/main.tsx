import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';

import LeftPanelLayout from './layouts/LeftPanel/LeftPanelLayout.tsx';
import AuthLayout from './layouts/Auth/AuthLayout.tsx';

import CartPage from './pages/Cart/Cart.tsx';
import ErrorPage from './pages/Error/Error.tsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.tsx';
import LoginPage from './pages/Login/Login.tsx';
import RegisterPage from './pages/Register/Register.tsx';

import { API_URL_PREFIX } from './configs/API';
import { RequireAuth } from './hocs';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

// Each lazy loaded component should be inside <suspense>
const MenuPage = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth> <LeftPanelLayout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: (
					//wrapped menupage with suspense due to lazy page loading
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
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
