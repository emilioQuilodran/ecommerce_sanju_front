export const initialState = {
    counter: 0
}

initialState.counter = initialState.counter+1

const counterReducer = (state, action) => {
    let newState;

    switch (action.type) {
        case 'ADD':
            newState = {
                counter: state.counter + 1
            }
            break;
        case 'SUB':
            newState = {
                counter: state.counter - 1
            }
            break;
    
        default:
            newState = {
                counter: state.counter
            }
            break;
    }


    return newState;
}

export default counterReducer