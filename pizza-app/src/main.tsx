import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CartPage from './pages/Cart/Cart.tsx';
import MenuPage from './pages/Menu/Menu.tsx';
import MenuLayout from './layouts/Menu/Menu.tsx';
import ErrorPage from './pages/Error/Error.tsx';
const router = createBrowserRouter([
	{
		path: '/',
		element: <MenuLayout />,
		children: [
			{
				path: '/',
				element: <MenuPage />,
			},
			{
				path: '/cart',
				element: <CartPage />,
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
