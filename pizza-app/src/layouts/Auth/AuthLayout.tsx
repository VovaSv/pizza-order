import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import cn from 'classnames';

export default function AuthLayout() {
	return (
		<div className={styles['container']}>
			<div className={styles['left-section_logo']}>
				<img src='/auth-logo.svg' alt='auth logo' />
			</div>
			<div className={styles['right-section_content']}>
				<Outlet />
			</div>
		</div>
	);
}
