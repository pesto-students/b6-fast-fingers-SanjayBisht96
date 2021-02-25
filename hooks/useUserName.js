import { useState, useEffect } from "react";

function useUserName(val) {
    const [userName, setUserName] = useState(val);
    const [emptyNameError, setEmptyNameError] =useState(false);

    useEffect(()=>{
        setEmptyNameError(false);
    },[]);

    return {
        userName, 
        setUserName, 
        emptyNameError,
        setEmptyNameError
    }
}
export default useUserName;