import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { FormEvent, useState, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { registerAsyncThunk } from '../../store/thunks/userThunks';
import { userActions } from '../../store/slices/userSlice';

export default function Login() {
	//const [error, setError] = useState<string | null>();
	//const [isFadingOut, setIsFadingOut] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		console.log('UseEffect [jwt]: ', jwt);
	}, [jwt])

	const callRegister = async (email: string, password: string, name: string) => {
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
		dispatch(registerAsyncThunk({ email, password, name, navigate }))
	}


	useEffect(() => {
		console.log('useEffect: on render in Register page')
		if (registerErrorMessage) {
			const removeErrorTimer = setTimeout(() => {
				dispatch(userActions.clearRegisterError());
			}, 3000); // Adjust for fade-out duration

			return () => {
				clearTimeout(removeErrorTimer);
			};
		}
	}, [registerErrorMessage]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		//setError(null);
		e.preventDefault();
		dispatch(userActions.clearRegisterError())

		//const submitEvent = e.nativeEvent as SubmitEvent;
		//const submitter = submitEvent.submitter as HTMLElement | null;
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string | null;
		const password = formData.get('password') as string | null;
		const name = formData.get('name') as string | null;
		console.log('form: ', email, password);
		if (email && password && name) {
			await callRegister(email, password, name);
		}
	}
	//await sendLogin(email, password);

	return (
		<div className={styles['register-container']}>
			<Heading>{'Registration'}</Heading>
			<div className={cn(styles['error'])}>{registerErrorMessage}</div>
			<form className={styles['register-form']} onSubmit={handleSubmit}>
				<div className={styles['register-form_field']}>
					<label htmlFor='email'>You email</label>
					<Input id='email' name='email' placeholder='Enter email' />
				</div>
				<div className={styles['register-form_field']}>
					<label htmlFor='password'>You password</label>
					<Input id='password' name='password' type='password' placeholder='Enter password' />
				</div>
				<div className={styles['register-form_field']}>
					<label htmlFor='name'>You name</label>
					<Input id='name' name='name' placeholder='Enter name' />
				</div>
				<Button appearance='big'>Register</Button>
			</form>

			<div className={styles['register-footer']}>
				<div>Already have account?</div>
				<Link to={'/auth/login'}>Login</Link>
			</div>
		</div>
	);
}
