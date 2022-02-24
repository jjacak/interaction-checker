import React, { useContext } from 'react';
import { ReactComponent as CloseIcon } from '../img/close-icon.svg';
import AppContext from '../store/appContext';
import classes from './DrugsListItem.module.css';

const DrugsListItem = (props) => {
	const ctx = useContext(AppContext);

	return (
		<li className={classes['added-drug']}>
			<p className={classes['drug-name']}>{props.drug.name}</p>
			<button
				className={classes.button}
				onClick={ctx.removeDrug.bind(null, props.drug.id)}
			>
				<CloseIcon />
			</button>
		</li>
	);
};
export default DrugsListItem;
