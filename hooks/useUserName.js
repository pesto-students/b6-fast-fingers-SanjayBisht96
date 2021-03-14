import { useState, useEffect } from "react";
import { getFromStorage } from "../utils/localStorage";
import { getCurrentUser } from '../utils/callApi';

function useUserName() {
    const [userName, setUserName] = useState('');
    const [emptyNameError, setEmptyNameError] = useState(false);

    useEffect(() => {
        async function getUser (){
            let name = await getCurrentUser();
            if(name){
                setUserName(name);
            }else{
                setEmptyNameError(false);
            }
        }
        getUser();
    },[]);

    return {
        userName, 
        setUserName, 
        emptyNameError,
        setEmptyNameError
    }
}
export default useUserName;