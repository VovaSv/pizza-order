import { NavLink, Outlet } from 'react-router-dom';
import styles from './LeftPanelLayout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

export default function LeftPanel() {
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
				<Button className={styles['exit_button']}>
					<img src='/exit-icon.svg' alt='' />
					Exit
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}
