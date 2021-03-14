
async function saveScore(userName,score){
    const res = await fetch(
        '/api/addscorelist',
        {
        body: JSON.stringify({
            userName: userName,
            score: score
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
        }
    );
}

async function getScore(userName){
    const res = await fetch(
        '/api/getscorelist',
        {
        body: JSON.stringify({
            userName: userName
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
        }
    );

    if(res.status === 200){
        const {scoreList} = await res.json();
        return scoreList;
    }    

}

async function getRandomWord(diffLevel){
    const res = await fetch(
        '/api/getrandomword',
        {
        body: JSON.stringify({
                diffLevel: diffLevel
        }),            
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
        }
    );

    if(res.status === 200){
        const {word} = await res.json();
        return word;
    }    

}


async function getCurrentUser(){
    const res = await fetch(
        '/api/getuser',
        {            
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
        }
    );

    if(res.status === 200){
        const {user} = await res.json();
        return user;
    }    

}

async function logout(){
    const res = await fetch(
        '/api/logout',
        {            
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
        }
    );

    if(res.status === 200){
        
        return true;
    }    

}




export {
    saveScore,
    getScore,
    getRandomWord,
    getCurrentUser,
    logout
};