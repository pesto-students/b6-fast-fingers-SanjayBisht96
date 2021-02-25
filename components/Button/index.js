import React from 'react';
import styles from './index.module.css'

export default function Button({styleClass,clickFunction,imgSrc,altText,imgClass,textClass,ButtonText}){

    return(
        <React.Fragment>
            <div className={styles[styleClass] + ` ` +styles.Button}>
            <img
                src={imgSrc}
                alt={altText}  
                width="64px" height="64px" 
                className={styles[imgClass]}
            />
            <div className={styles[textClass]} onClick={clickFunction}>{ButtonText}</div>
            </div>
        </React.Fragment>
    );

}