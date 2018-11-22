const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
export const fetchData = () => {
    return dispatch => {
        dispatch({
            type: "GET_REQUEST",
            payload: true,
        });
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`)
            .then(responce => responce.json())
            .then(result => dispatch({
                type: "GET_SUCCES",
                payload: result,
            }))
            .catch(error => dispatch({
                type: "GET_FAIL",
                payload: error.message,
            }));
    }
}