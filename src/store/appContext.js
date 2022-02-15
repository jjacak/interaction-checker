import React from 'react';

const AppContext = React.createContext({
    addedDrugs:[],
    error:null,
    checkResult:null,

});

export default AppContext;