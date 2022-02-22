import React, { useReducer} from 'react';
import AppContext from './appContext';

const appReducer = (state, action) => {
	if (action.type === 'ADD_DRUG') {
		const newDrug = { ...action.drug, id: new Date().getTime() };
		const updatedDrugs = [...state.addedDrugs, newDrug];
		return { ...state, addedDrugs: updatedDrugs };
	} else if (action.type === 'ERROR') {
		return { ...state, modal: action.error };
	} else if (action.type === 'HIDE_MODAL') {
		return { ...state, modal: null, interactions: null };
	} else if (action.type === 'REMOVE_DRUG') {
		const updatedDrugs = state.addedDrugs.filter(
			(item) => item.id !== action.id
		);
		return { ...state, addedDrugs: updatedDrugs };
	} else if (action.type === 'REMOVE_ALL') {
		return { ...state, addedDrugs: [] };
	} else if (action.type === 'INTERACTIONS') {
		return { ...state, interactions: action.interactionsArray };
	}else if(action.type==='LOADING'){
        return {...state, isLoading:true}
    }else if(action.type==='LOADED'){ 
        return {...state, isLoading:false}
    }else {
        return {...state}
    }
};
const defaultAppState = {
	addedDrugs: [],
	modal: null,
	interactions: null,
    isLoading:false,
 
};

const AppContextProvider = (props) => {
	const [appState, dispatchApp] = useReducer(appReducer, defaultAppState);
  

	const addDrugHandler = (drugName) => {
		async function fetchRxcui() {
            dispatchApp({type:'LOADING'})
			try {
				const url = 'https://rxnav.nlm.nih.gov/REST/rxcui.json?name=';
				const response = await fetch(url + drugName);
				const data = await response.json();
				let rxcui = null;

				if (data.idGroup.hasOwnProperty('rxnormId')) {
					rxcui = data.idGroup.rxnormId[0];
				}

				if (rxcui) {
					dispatchApp({
						type: 'ADD_DRUG',
						drug: { name: drugName, rxcui: rxcui },
					});
				} else {
					dispatchApp({
						type: 'ERROR',
						error: {
							title: 'Drug not found',
							message:
								'Sorry, entered name was not found in database. Perhaps this drug is listed under a different name.',
						},
					});
				}
			} catch (error) {
				dispatchApp({
					type: 'ERROR',
					error: {
						title: 'Error',
						message: 'Sorry, failed to connect to database.',
					},
				});
			}
            dispatchApp({type:'LOADED'})
		}
		fetchRxcui();
	};

	const checkInteractionHandler = (e) => {
		e.preventDefault();
        
        if(appState.addedDrugs.length<2){
            dispatchApp({
                type: 'ERROR',
                error: {
                    title: 'No drugs added',
                    message: 'Please add at least two drug names to the list.',
                },
            })
            return;
        }
        dispatchApp({type:'LOADING'});

		async function fetchInteractions() {
			try {
				let url =
					'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=';

				for (let i = 0; i < appState.addedDrugs.length; i++) {
					if (i === 0) {
						url += appState.addedDrugs[i].rxcui;
					} else {
						url += `+${appState.addedDrugs[i].rxcui}`;
					}
				}
				const response = await fetch(url);
				const data = await response.json();
				let interactions;

				if (!data.fullInteractionTypeGroup) {
					interactions = ['No interactions found.'];
				} else {
					interactions =
						data.fullInteractionTypeGroup[0].fullInteractionType.map(
							(el) => el.interactionPair[0].description
						);
				}
				dispatchApp({ type: 'INTERACTIONS', interactionsArray: interactions });
			} catch (error) {
				dispatchApp({
					type: 'ERROR',
					error: {
						title: 'Error',
						message: 'Sorry, failed to connect to database.',
					},
				});
			}
            dispatchApp({type:'LOADED'});
		}
		fetchInteractions();
        
	};

	const removeDrugHandler = (id) => {
		dispatchApp({ type: 'REMOVE_DRUG', id: id });
	};

	const hideModalHandler = () => {
		dispatchApp({ type: 'HIDE_MODAL' });
	};

	const removeAllHandler = () => {
		dispatchApp({ type: 'REMOVE_ALL' });
	};

	const appContext = {
		addedDrugs: appState.addedDrugs,
		modal: appState.modal,
		interactions: appState.interactions,
        isLoading:appState.isLoading,
		addDrug: addDrugHandler,
		removeDrug: removeDrugHandler,
		hideModal: hideModalHandler,
		removeAll: removeAllHandler,
		checkInteractions: checkInteractionHandler,
	};

	return (
		<AppContext.Provider value={appContext}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
