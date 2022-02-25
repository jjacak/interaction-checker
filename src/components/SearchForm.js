import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '../UI/Button';
import AppContext from '../store/appContext';
import classes from './SearchForm.module.css';

const SearchForm = () => {
	const [suggestionsList, setSuggestionsList] = useState([]); //full list of suggestions fetched from API
	const [searchInput, setSearchInput] = useState('');
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestion] = useState(false);
	const [activeSuggestion, setActiveSuggestion] = useState(0);


	const activeSuggestionRef = useRef();

	const ctx = useContext(AppContext);

	//fetch suggestions list from API
	useEffect(() => {
		const abortController = new AbortController();
		const fetchSuggestions = async () => {
			const response = await fetch(
				'https://rxnav.nlm.nih.gov/REST/displaynames.json',{ signal: abortController.signal }
			);
			const data = await response.json();
			setSuggestionsList(data.displayTermsList.term);
		};
		fetchSuggestions();

		return () => {
			abortController.abort();
		  };
	}, []);

	//control state of input, return filtered search suggestions
	const inputChangeHandler = (e) => {
		setSearchInput(e.target.value);
		setShowSuggestion(true);

		if (e.target.value.length > 1) {
			setFilteredSuggestions(
				suggestionsList.filter((item) => item.startsWith(e.target.value))
			);
		} else {
			setFilteredSuggestions([]);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (searchInput.trim().length === 0) {
			ctx.errorHandler({
				title: 'Empty input field',
				message: ['Please enter a drug name.'],
			});
			return;
		}
		ctx.addDrug(searchInput);
		setSearchInput('');
	};
	//scrolls the suggestions list to make active suggestion visible
	useEffect(() => {
		if (!showSuggestions || !activeSuggestionRef.current) {
			return;
		}
		activeSuggestionRef.current.scrollIntoView(false);
	}, [showSuggestions]);

	//select suggestion with a click
	const suggestionClickHandler = (e) => {
		setActiveSuggestion(0);
		setSearchInput(e.target.innerText);
		setShowSuggestion(false);
		setFilteredSuggestions([]);
	};
	//select suggestion with arrow keys
	const suggestionKeydownHandler = (e) => {
		//blur input on esc
		if (e.keyCode === 27) {
			e.target.blur();
		}
		if (filteredSuggestions.length === 0) {
			return;
		}
		//arrow up
		if (e.keyCode === 38) {
			if (activeSuggestion === 0) {
				return;
			}
			setActiveSuggestion((current) => current - 1);

			//arrow down
		} else if (e.keyCode === 40) {
			if (activeSuggestion === filteredSuggestions.length - 1) {
				return;
			}
			setActiveSuggestion((current) => current + 1);

			//enter
		} else if (e.keyCode === 13 && showSuggestions) {
			setSearchInput(filteredSuggestions[activeSuggestion]);
			setActiveSuggestion(0);
			setShowSuggestion(false);
		}
	};

	//helper function
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	return (
		<React.Fragment>
			
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes['form-control']}>
					<label className={classes['form__label']}>Enter drug name:</label>
					<div className={classes['input-control']}>
						<input
							className={classes['form__input']}
							onChange={inputChangeHandler}
							onFocus={() => {
								setShowSuggestion(true);
							}}
							onClick={() => {
								setShowSuggestion(true);
							}}
							onBlur={() => {
								sleep(300).then(() => setShowSuggestion(false));
							}} //sleep function prevents onblur to trigger before onclick on list item
							onKeyDown={suggestionKeydownHandler}
							value={searchInput}
						/>
						<ul className={classes['suggestion-list']}>
							{filteredSuggestions &&
								showSuggestions &&
								filteredSuggestions.map((item) => (
									<li
										key={filteredSuggestions.indexOf(item)}
										className={
											filteredSuggestions.indexOf(item) === activeSuggestion
												? classes['suggestion-active']
												: ''
										}
										onClick={suggestionClickHandler}
										ref={
											filteredSuggestions.indexOf(item) === activeSuggestion
												? activeSuggestionRef
												: null
										}
									>
										{item}
									</li>
								))}
						</ul>
					</div>
				</div>
				<Button type="submit">Add</Button>
			</form>
		</React.Fragment>
	);
};

export default SearchForm;

// todos:
// -split into separate components
//-aria

