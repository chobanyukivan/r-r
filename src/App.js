import React, { Component } from 'react';
import {connect} from "react-redux";
// import {fetchData} from "./actions/photoActions";
import './App.css';

class App extends Component {
  render() {
    const {store, getPhotosAction} = this.props;
    return (
      <div className="App">
          <h1>Тестовое приложение</h1>
          <button onClick={getPhotosAction}>Получить фото</button>
          { store.isFetching ?
              <p>Загрузка</p> :
              store.error ?
                  <p>Чтото пошло не так. Ошибка {store.error}</p> :
                  store.photos ?
                       store.photos.hits.map((item, index) => {
                              return (
                                  <p key={index}>{item.objectID}</p>
                              )
                          }) : <p>Получите фото</p>
          }

      </div>
    );
  }
}
const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


const fetchData = () => {
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

const getStateToPtops = (store) => {
  return {
      store: store,
    // error: store.error,
  }
};

const getDispatchToProps = dispatch => {
  return {
    getPhotosAction: () => {
      dispatch(fetchData());
    }
  }
};
export default connect(getStateToPtops, getDispatchToProps)(App);
