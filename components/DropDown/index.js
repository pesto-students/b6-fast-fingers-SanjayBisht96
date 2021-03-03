import styles from './index.module.css';
import { DIFF_OPTIONS } from '../../utils/consts';
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
        <>
            <select onChange={updateDiffValues} className={styles.selectLevel}>
                {options}
            </select>
        </>
    );

}