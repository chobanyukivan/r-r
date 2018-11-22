const initialState = {
    isFetching: false,
    error: '',
}

export const reducer = (store = initialState, action) => {
    switch (action.type) {
        case "GET_REQUEST":
            return {
                ...store, isFetching: action.payload,
            }
        case "GET_SUCCES":
            return {
                ...store, list: action.payload, isFetching: false,
            }
        case "GET_FAIL":
            return {
                ...store, error: action.payload, isFetching: false,
            }
        default:
            return {
                ...store, list: ''
            }
    }
}