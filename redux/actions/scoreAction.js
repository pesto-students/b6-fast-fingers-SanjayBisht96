//Action Types
export const INCREMENT_SCORE = "INCREMENT_SCORE";
export const RESET_SCORE = "RESET_SCORE";


//Action Creator
export const incrementScore = () => ({
   type: INCREMENT_SCORE
});

export const resetScore = () => ({
    type: RESET_SCORE
});