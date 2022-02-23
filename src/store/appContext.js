import React from 'react';

const AppContext = React.createContext({
    addedDrugs:[],
    modal:null,
    isLoading:false,
    addDrug:()=>{},
    removeDrug:()=>{},
    hideModal:()=>{},
    removeAll:()=>{},
    checkInteractions:()=>{}

});

export default AppContext;