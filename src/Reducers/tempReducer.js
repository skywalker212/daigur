const tempReducerDefaultState = {
    count:0
};

const tempReducer = (state = tempReducerDefaultState, action) =>{
    switch(action.type){
        case 'INC':
            return {...state,count: state.count+1}
        case 'DEC':
            return {...state,count:state.count-1}
        default:
            return state;
    }
}

export default tempReducer;