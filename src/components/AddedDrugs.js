import React from 'react';
import Button from '../UI/Button';
import DrugsListItem from './DrugsListItem';
import classes from './AddedDrugs.module.css';

const DUMMY_DRUGS = [{name: 'Paracetamol', id:'d1'}, {name:'Ibuprofen', id:'d2'}]

const AddedDrugs = () => {
	return (
		<section className={classes['added-drugs']}>
			<ul className={classes['drug-list']}>

                {DUMMY_DRUGS.map(drug=> {
                    return <DrugsListItem drug={drug} key={drug.id}></DrugsListItem>
                })}
				
			</ul>
			<div className={classes.actions}>
				<Button>Check for interactions</Button>
				{/* figure out btn classes */}
				<Button className="button--alt">Clear</Button>
			</div>
		</section>
	);
};

export default AddedDrugs;
