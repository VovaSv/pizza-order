import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(
	({ className, ...props }, ref) => {
		return (
			<div className={styles['input-wrapper']}>
				<input
					ref={ref}
					className={cn([styles['input']], className, {})}
					{...props}
				/>
				<img className={styles['icon']} src='/search.svg' alt='' />
			</div>
		);
	}
);

export default Search;
