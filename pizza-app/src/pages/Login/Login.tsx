import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { loginAsyncThunk } from '../../store/thunks/userThunks';

export default function Login() {
	const [error, setError] = useState<string | null>();
	//const [isFadingOut, setIsFadingOut] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const jwt = useSelector((s: RootState) => s.user.jwt);

	useEffect(() => {
		console.log('UseEffect [jwt]: ', jwt);
	}, [jwt])

	const sendLogin = async (email: string, password: string) => {
		/* Before add Async Thunk
		console.log('we call to login')
		try {
			const { data } = await axios.post<LoginResponse>(`${API_URL_PREFIX}/auth/login`, {
				email, password
			});
			if (data.access_token) {
				//localStorage.setItem('jwt', data.access_token);
				dispatch(userActions.addJwt(data.access_token))
				navigate('/');
			}
			return;

		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.response?.data.message)
			}
		}
*/
		dispatch(loginAsyncThunk({ email, password, navigate }))
	}


	useEffect(() => {
		console.log('useEffect: on render')
		if (error) {
			const removeErrorTimer = setTimeout(() => {
				setError(null);
			}, 3000); // Adjust for fade-out duration

			return () => {
				clearTimeout(removeErrorTimer);
			};
		}
	}, [error]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setError(null);
		e.preventDefault();
		//const submitEvent = e.nativeEvent as SubmitEvent;
		//const submitter = submitEvent.submitter as HTMLElement | null;
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string | null;
		const password = formData.get('password') as string | null;
		console.log('form: ', email, password);
		if (email && password) {
			await sendLogin(email, password);
		}
	}
	//await sendLogin(email, password);

	return (
		<div className={styles['login-container']}>
			<Heading>{'Login'}</Heading>
			<div className={cn(styles['error'])}>{error}</div>
			<form className={styles['login-form']} onSubmit={handleSubmit}>
				<div className={styles['login-form_field']}>
					<label htmlFor='email'>You email</label>
					<Input id='email' name='email' placeholder='Enter email' />
				</div>
				<div className={styles['login-form_field']}>
					<label htmlFor='password'>You password</label>
					<Input id='password' name='password' type='password' placeholder='Enter password' />
				</div>
				<Button appearance='big'>Enter</Button>
			</form>

			<div className={styles['login-footer']}>
				<div>No account?</div>
				<Link to={'/register'}>Register</Link>
			</div>
		</div>
	);
}
