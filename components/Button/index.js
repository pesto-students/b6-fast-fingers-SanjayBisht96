import styles from './index.module.css'

export default function Button({styleClass,clickFunction,imgSrc,altText,imgClass,textClass,ButtonText}){

    return(
        <>
            <div className={styles[styleClass] + ` ` +styles.Button} onClick={clickFunction}>
            <img
                src={imgSrc}
                alt={altText}  
                width="64px" height="64px" 
                className={styles[imgClass]}
            />
            <div className={styles[textClass]}>{ButtonText}</div>
            </div>
        </>
    );

}