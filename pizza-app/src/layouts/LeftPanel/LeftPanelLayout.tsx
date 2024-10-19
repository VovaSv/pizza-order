import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './LeftPanelLayout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/slices/userSlice';

export default function LeftPanel() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

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
					<div className={styles['name']}>User Name</div>
					<div className={styles['email']}>username@gmail.com</div>
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
