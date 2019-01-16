let user = JSON.parse(sessionStorage.getItem('user'));
const firebaseReducerDefaultState = {
    provider: undefined,
    user: user!==null?user:undefined
};

const firebaseReducer = (state = firebaseReducerDefaultState, action)=>{
    switch(action.type){
        case 'ADD_PROVIDER':
            return {
                ...state, provider: action.provider
            }
        case 'ADD_USER':
            return {
                ...state, user: action.user
            }
        case 'REMOVE_USER':
            return {
                ...state, user: undefined
            }
        default:
            return state;
    }
};

export default firebaseReducer;