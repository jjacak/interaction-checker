import React, { useState, useEffect, useContext } from 'react';
import Button from '../UI/Button';
import AppContext from '../store/appContext';
import classes from './SearchForm.module.css';

let inputSuggestions;

const SearchForm = () => {
	const [searchInput, setSearchInput] = useState('');
	const [filteredSuggestions, setFilteredSuggestions] = useState();

	//fetches names of drugs in database from API
	useEffect(() => {
		const fetchSuggestions = async () => {
			const response = await fetch(
				'https://rxnav.nlm.nih.gov/REST/displaynames.json'
			);
			const data = await response.json();
			inputSuggestions = data.displayTermsList.term;
		};
		fetchSuggestions();
	}, []);

	//filters suggestions list
	useEffect(() => {
		if (searchInput.length<2) {
			return;
		}
		const filterSuggestions = inputSuggestions.filter((item) =>
			item.startsWith(searchInput)
		);
		setFilteredSuggestions(filterSuggestions);

		return ()=> {setFilteredSuggestions('')}
	}, [searchInput]);

	const inputChangeHandler = (e) => {
		setSearchInput(e.target.value);
	};
	return (
		<form className={classes.form}>
			<div className={classes['form-control']}>
				<label htmlFor="drug-name" className={classes['form__label']}>
					Enter drug name:
				</label>
				<input
					type="text"
					id="drug-name"
					name="drug-name"
					list="name-suggestions"
					className={classes['form__input']}
					onChange={inputChangeHandler}
					value={searchInput}
					autoComplete="off"
				></input>
				<datalist id="name-suggestions" className={classes['form__datalist']}>
					{/* <option value="TEST"></option>
                    <option value="TEST2"></option> */}
					{filteredSuggestions
						? filteredSuggestions.map((item) => {
								return (
									<option
										value={item}
										key={filteredSuggestions.indexOf(item)}
									></option>
								);
						  })
						: null}
				</datalist>
			</div>
			<Button type="submit">Add</Button>
		</form>
	);
};

export default SearchForm;
