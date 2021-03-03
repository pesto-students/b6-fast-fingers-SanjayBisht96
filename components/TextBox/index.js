import {useEffect} from 'react';
import styles from './index.module.css';


export default function Textbox({id,textBoxClass,text,setText,placeholder}){

    const handleText =(e) => {
        let input = e.target.value;
        if(id !== "inputName"){
            if(input.match(/[^A-Za-z]|\[|\]/gi)){
                input = input.replace(/[^A-za-z]|\[|\]/gi,'');
            }
            setText(input.toUpperCase());
        }else{
            if(input.match(/$[A-Za-z][^\s]|\[|\]/gi)){
                input = input.replace(/[\s]|\[|\]/gi,'');
            }
            setText(input);
        }
    }

    useEffect(() => {
        document.getElementById(id).focus();
    }, [])

    return(
        <>
            <input
            id={id}
            className={styles[textBoxClass]}
            type="text"
            placeholder={placeholder}
            onChange={handleText}
            autoComplete="off"
            value={text}
            />
        </>
    );

}