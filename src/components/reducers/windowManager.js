// Dispatcher for windowManager
export default (state = [], action = {}) => {
    switch (action.type){
        case 'OPEN_WINDOW':
            state = action.text;
            return state;
        case 'CLOSE_WINDOW':
            state = action.text;
            return state;
        default: return state;
    }
}