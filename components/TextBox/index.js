import React from 'react';
import styles from './index.module.css'

export default function Textbox({id,textBoxClass,text,setText,placeholder,changeFunction}){

    return(
        <React.Fragment>
            <input
            id={id}
            className={styles[textBoxClass]}
            type="text"
            placeholder={placeholder}
            onChange={changeFunction}
            autoComplete="off"
            value={text}
            />
        </React.Fragment>
    );

}