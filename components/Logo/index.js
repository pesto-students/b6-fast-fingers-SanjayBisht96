import styles from './index.module.css';
import Image from 'next/image';

export default function Logo({logoClass,imgSrc,altText,imgClass,textClass,text}) {
    return  (<div className={styles[logoClass]}>
                <img
                    src={imgSrc}
                    alt={altText}
                    className={styles[imgClass]}
                />
                <div className={styles[textClass]}>{text}s</div>
            </div>
    )
  }