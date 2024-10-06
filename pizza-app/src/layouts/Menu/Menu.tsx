import { Link, Outlet } from 'react-router-dom';

export default function Menu() {
	return (
		<div>
			<div>
				Menu Layout
				<br />
				<Link to={'/'}>Menu</Link>
				<br />
				<Link to={'/cart'}>Cart</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
