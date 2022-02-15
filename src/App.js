import React from 'react';
import classes from './App.module.css';
import Card from './UI/Card';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import AddedDrugs from './components/AddedDrugs'
import AppContextProvider from './store/appContextProvider';

function App() {
	return (
	<AppContextProvider>
			<div className={classes.wrapper}>
			<Card>
				<Header/>
        <main className={classes.main}>
          <SearchForm/>
          <AddedDrugs/>
        </main>
			</Card>
		</div>
	</AppContextProvider>
	);
}

export default App;
