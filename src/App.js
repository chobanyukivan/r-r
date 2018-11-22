import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchData} from "./actions/listActions";
import './App.css';

class App extends Component {
  render() {
    const {store, getPhotosAction} = this.props;
    return (
      <div className="App">
          <h1>Тестовое приложение</h1>
          <button onClick={getPhotosAction}>Получить данные</button>
          { store.isFetching ?
              <p>Загрузка</p> :
              store.error ?
                  <p>Чтото пошло не так. Ошибка {store.error}</p> :
                  store.list ?
                       store.list.hits.map((item, index) => {
                              return (
                                  <p key={index}>{item.objectID}</p>
                              )
                          }) : <p>Получите данные</p>
          }

      </div>
    );
  }
}

const getStateToPtops = (store) => {
  return {
      store: store,
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
