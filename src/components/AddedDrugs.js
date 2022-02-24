import React, {useContext} from 'react';
import Button from '../UI/Button';
import DrugsListItem from './DrugsListItem';
import AppContext from '../store/appContext';
import classes from './AddedDrugs.module.css';



const AddedDrugs = () => {
	const ctx = useContext(AppContext);

	return (
		<section className={classes['added-drugs']}>
			<ul className={classes['drug-list']}>

                {ctx.addedDrugs.map(drug=> {
                    return <DrugsListItem drug={drug} key={drug.id}></DrugsListItem>
                })}
				
			</ul>
			<div className={classes.actions}>
				<Button onClick={ctx.checkInteractions}>Check for interactions</Button>
				<Button className="button--alt" onClick={ctx.removeAll}>Clear</Button>
			</div>
		</section>
	);
};

export default AddedDrugs;
