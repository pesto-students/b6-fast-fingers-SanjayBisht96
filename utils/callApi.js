
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

async function getRandomWord(){
    const res = await fetch(
        '/api/getrandomword',
        {
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


export {
    saveScore,
    getScore,
    getRandomWord
};