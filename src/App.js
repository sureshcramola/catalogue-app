import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import './App.scss';
import Catalogue from './components/Catalogue';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="main-wrapper">
            <Catalogue />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;