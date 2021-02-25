import React from 'react';
import styles from './index.module.css'

export default function DropDown({diffOptions,setDiffFactor}){

    const updateDiff = (e) => {
        setDiffFactor(e.target.value);
    }

    const options = Object.keys(diffOptions).map((level) => {
        return (<option value={diffOptions[level]}>{level}</option>)
    });

    return(
        <React.Fragment>
            <select onChange={updateDiff} className={styles.selectLevel}>
                {options}
            </select>
        </React.Fragment>
    );

}