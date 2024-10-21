import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './LeftPanelLayout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { userActions } from '../../store/slices/userSlice';
import { useEffect } from 'react';
import { getProfileAsyncThunk } from '../../store/thunks/userThunks';

export default function LeftPanel() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((s: RootState) => s.user.profile);
	const items = useSelector((s: RootState) => s.cart.items);

	useEffect(() => {
		dispatch(getProfileAsyncThunk())
	}, [dispatch])

	const logout = () => {
		//localStorage.removeItem('jwt');
		dispatch(userActions.logout())
		navigate('/auth/login')

	}
	return (
		<div className={styles['container']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img className={styles['avatar']} src='/avatar.png' alt='' />
					<div className={styles['name']}>{profile?.name}</div>
					<div className={styles['email']}>{profile?.email}</div>
				</div>
				<div className={styles['menu']}>
					<NavLink
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles['active']]: isActive,
							})
						}
						to={'/'}
					>
						<img src='/menu-icon.svg' alt='' />
						Menu
					</NavLink>

					<NavLink
						to={'/cart'}
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles['active']]: isActive,
							})
						}
					>
						<img src='/cart-icon.svg' alt='' />
						Cart
					</NavLink>
					{items.reduce((acc, item) => acc += item.count, 0)}
				</div>
				<Button className={styles['exit_button']} onClick={logout}>
					<img src='/exit-icon.svg' alt='' />
					Logout
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}

