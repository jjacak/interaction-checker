import React from "react";
import { ReactComponent as CloseIcon } from "../img/close-icon.svg";
import classes from "./DrugsListItem.module.css";


const DrugsListItem = (props)=> {
    return <li className={classes['added-drug']}>
    <p className={classes['drug-name']}>{props.drug.name}</p>
    <button className={classes.button}>
    <CloseIcon/>
    </button>
</li>
};
export default DrugsListItem;