import cn from 'classnames';
import styles from './Heading.module.css';
import { HeadingProps } from './Heading.props';

export default function Heading({
	className,
	children,
	...props
}: HeadingProps) {
	return (
		<h1 className={cn([styles['h1']], className)} {...props}>
			{children}
		</h1>
	);
}
