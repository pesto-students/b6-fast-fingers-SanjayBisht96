import {useEffect} from 'react';
import styles from './index.module.css';


export default function Textbox({id,type,textBoxClass,text,setText,placeholder}){

    const handleText =(e) => {
        let input = e.target.value;
        switch(type){
            case 'text':
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
                break;
            case 'password':
                setText(input);
                break;
            case 'email':
                setText(input);
                break;
            default:
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
            type={type}
            className={styles[textBoxClass]}
            placeholder={placeholder}
            onChange={handleText}
            autoComplete="off"
            value={text}
            />
        </>
    );

}