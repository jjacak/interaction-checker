import React, {useContext} from "react";
import AppContext from "./appContext";

const AppContextProvider = (props)=>{

    const appContext = {
        addedDrugs:[],
        error:null,
        checkResult:null,
    }

    return <AppContext.Provider value={appContext}>{props.children}</AppContext.Provider>
};

export default AppContextProvider;