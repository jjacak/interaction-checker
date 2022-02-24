import React, { useContext} from 'react';
import classes from './App.module.css';
import Card from './UI/Card';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import AddedDrugs from './components/AddedDrugs';
import Modal from './UI/Modal';
import AppContext from './store/appContext';
import LoadingIcons from 'react-loading-icons';


function App() {
	const ctx = useContext(AppContext);

	return (
		<div className={classes.wrapper}>
			<Card>
			{ctx.isLoading && <LoadingIcons.Oval stroke="Var(--color-primary)" strokeOpacity={.5} speed={1} strokeWidth="5" style={{position:'absolute',top:'45%',left:'50%', zIndex:'100',transform:'translateX(-50%)'}} />}
				<Header />
				<main className={classes.main}>
					<SearchForm />
					<AddedDrugs />
				</main>
			</Card>
			{ctx.modal && (
				<Modal title={ctx.modal.title} onClick={ctx.hideModal}>
					<ul>
						{ctx.modal.message.map((item) => {
							return <li key={ctx.modal.message.indexOf(item)}>{item}</li>;
						})}
					</ul>
					{ctx.modal.content==='interactions' && <p style={{color:'var(--color-grey-700)', marginTop:'1rem'}}>
						<strong>Disclaimer: </strong>It is not the intention of this
						application to provide specific medical advice. Please consult with
						a qualified physician for advice about medications.
					</p>}
				</Modal>
			)}
		</div>
	);
}

export default App;
