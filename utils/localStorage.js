const clearStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.clear();
    }
}

const addToStorage = (key,val) => {
    if (typeof window !== 'undefined') {
    localStorage.setItem(key,val)
    }
}

const getFromStorage = (key) => {
    if (typeof window !== 'undefined') {
    let value = localStorage.getItem(key);
    return value;
    }
}

export {
    clearStorage,
    addToStorage,
    getFromStorage
}