import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

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
