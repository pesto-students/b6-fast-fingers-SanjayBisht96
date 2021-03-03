import styles from '../../styles/Game.module.css';

export default function Word({wordClass,word,matchText}) {
 
    return  (
        <div id='word' className={styles[wordClass]}>{ word.split('').map((character,index) => (
            <span key={index} className={character === matchText[index] ? "matched":"notMatched" }>{character}</span>
          )) }</div>
    )
  }