import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CartPage from './pages/Cart/Cart.tsx';
import MenuPage from './pages/Menu/Menu.tsx';
import LeftPanelLayout from './layouts/LeftPanel/LeftPanel.tsx';
import ErrorPage from './pages/Error/Error.tsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.tsx';
import axios from 'axios';
import { API_URL_PREFIX } from './configs/API';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LeftPanelLayout />,
		children: [
			{
				path: '/',
				element: <MenuPage />,
			},
			{
				path: '/cart',
				element: <CartPage />,
			},
			{
				path: '/product/:id',
				element: <ProductDetails />,
				loader: async ({ params }) => {
					const { data } = await axios.get(
						`${API_URL_PREFIX}/products/${params.id}`
					);
					return data;
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
