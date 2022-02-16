import React, { useState, useEffect, useContext } from 'react';
import Button from '../UI/Button';
import AppContext from '../store/appContext';
import Downshift from 'downshift';
import classes from './SearchForm.module.css';

let inputSuggestions;

const SearchForm = () => {
	const [searchInput, setSearchInput] = useState('');

	let items;

	useEffect(() => {
		const fetchSuggestions = async () => {
			const response = await fetch(
				'https://rxnav.nlm.nih.gov/REST/displaynames.json'
			);
			const data = await response.json();
			const itemsArray = data.displayTermsList.term;
			items = itemsArray.map((item) => {
				return { value: item };
			});
			console.log(items);
		};
		fetchSuggestions();
	}, []);

	const inputChangeHandler = (e) => {
		setSearchInput(e.target.value);
	};
	return (
		<form className={classes.form}>
			<Downshift
				// onChange={selection =>
				//   alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
				// }
				itemToString={(item) => (item ? item.value : '')}
			>
				{({
					getInputProps,
					getItemProps,
					getLabelProps,
					getMenuProps,
					isOpen,
					inputValue,
					highlightedIndex,
					getRootProps,
				}) => (
					<div className={classes['form-control']}>
						<label {...getLabelProps()} className={classes['form__label']}>
							Enter drug name:
						</label>
						<div className={classes['input-control']}>
						<div {...getRootProps({}, { suppressRefError: true })}>
							<input {...getInputProps()} className={classes['form__input']} />
						</div>

						<ul {...getMenuProps()} className={classes['suggestion-list']}>
							{isOpen && inputValue.length > 1
								? items
										.filter(
											(item) => !inputValue || item.value.startsWith(inputValue)
										)
										.map((item, index) => (
											<li
												{...getItemProps({
													key: item.value,
													index,
													item,
													
												})}
											>
												{item.value}
											</li>
										))
								: null}
						</ul>
						</div>
					</div>
				)}
			</Downshift>
			<Button type="submit">Add</Button>
		</form>
	);
};

export default SearchForm;
