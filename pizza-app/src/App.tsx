import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Error from './pages/Error/Error';

function App() {
	const [counter, setCounter] = useState<number>(0);

	const addCounter = (e: MouseEvent<HTMLButtonElement>) => {
		console.log(e);
		e.currentTarget.disabled;
	};

	return (
		<>
			<Button onClick={addCounter}>Save </Button>
			<Button appearance='big' onClick={addCounter}>
				Save{' '}
			</Button>
			<Input value={''} placeholder='email' />
		</>
	);
}

export default App;
