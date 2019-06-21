import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from './pages/HomePage';

export default class App extends React.Component {
    render() {
        return (
          <div>
              <BrowserRouter>
                  <Route path="/" exact component={HomePage}/>
              </BrowserRouter>
          </div>
        );
    }
}
