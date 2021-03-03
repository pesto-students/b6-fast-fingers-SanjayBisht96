import { useState, useEffect } from "react";
import { getFromStorage } from "../utils/localStorage";

function useUserName() {
    const [userName, setUserName] = useState('');
    const [emptyNameError, setEmptyNameError] =useState(false);

    useEffect(() => {
        let name = getFromStorage("userName");
        if(name){
            setUserName(name);
        }else{
            setEmptyNameError(false);
        }
    },[]);

    return {
        userName, 
        setUserName, 
        emptyNameError,
        setEmptyNameError
    }
}
export default useUserName;