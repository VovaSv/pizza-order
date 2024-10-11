import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';

export default function Login() {
	return (
		<div className={styles['login-container']}>
			<Heading>{'Login'}</Heading>
			<form className={styles['login-form']}>
				<div className={styles['login-form_field']}>
					<label htmlFor='email'>You email</label>
					<Input id='email' placeholder='Enter email' />
				</div>
				<div className={styles['login-form_field']}>
					<label htmlFor='password'>You password</label>
					<Input id='password' type='password' placeholder='Enter password' />
				</div>
				<Button appearance='big'>Exit</Button>
			</form>

			<div>
				<div>No account?</div>
				<Link to={'/register'}>Register</Link>
			</div>
		</div>
	);
}
