const clearStorage = () => {
    localStorage.clear();
}

const addToStorage = (key,val) => {
    localStorage.setItem(key,val)
}

const getFromStorage = (key,type) => {
    let value = localStorage.getItem(key);
    // WIP Errors for score
    return value;
}

export {
    clearStorage,
    addToStorage,
    getFromStorage
}