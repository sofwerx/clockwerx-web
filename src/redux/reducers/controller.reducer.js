const controller = (state = {}, action) => {

    switch (action.type) {
        case 'PLAY':
            return {
                ...state,
                timerOn: action.payload.timerOn,
                timerID: action.payload.timerID,
                timerStart: action.payload.timerStart,
                timerTime: action.payload.timerTime,
            };
        case 'STOP':
            return {
                ...state,
                timerOn: action.payload.timerOn,
                timerID: action.payload.timerID,
                timerStart: action.payload.timerStart,
                timerTime: action.payload.timerTime,
            };
        case 'PAUSE':
            return {
                ...state,
                timerOn: action.payload.timerOn,
                timerID: action.payload.timerID,
                timerStart: action.payload.timerStart,
                timerTime: action.payload.timerTime,
            };
        case 'RESUME':
            return {
                ...state,
                timerOn: action.payload.timerOn,
                timerID: action.payload.timerID,
                timerStart: action.payload.timerStart,
                timerTime: action.payload.timerTime,
            };
            default:
                return state;
    }
}
export default controller;