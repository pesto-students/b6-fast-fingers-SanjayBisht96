import styles from './index.module.css';

export default function Logo({logoClass,imgSrc,altText,imgClass,textClass,text,description}) {
    return  (<div className={styles[logoClass]}>
                <img
                    src={imgSrc}
                    alt={altText}
                    className={styles[imgClass]}
                />
                <div className={styles[textClass]}>{text}</div>
                {description ?   
                    <div className={styles.description}>
                        <div className={styles.line} ></div>
                        <div className={styles.descriptionText}>{description}</div>
                        <div className={styles.line}></div>
                    </div> : null}
            </div>
    )
  }