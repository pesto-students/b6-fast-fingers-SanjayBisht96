import React from 'react';
import styles from './index.module.css';
import { EASY,DIFF_OPTIONS } from '../../utils/consts';
import useDifficulty from '../../hooks/useDifficulty';

export default function DropDown(){

    const { setDiffValues } = useDifficulty();

    const updateDiffValues = (e) => {
        setDiffValues(e.target.value);
    }
  

   const options = Object.keys(DIFF_OPTIONS).map((level) => {
        return (<option key={level.id} value={DIFF_OPTIONS[level]}>{level}</option>)
    });

    return(
        <React.Fragment>
            <select onChange={updateDiffValues} className={styles.selectLevel}>
                {options}
            </select>
        </React.Fragment>
    );

}