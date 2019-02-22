import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/Home';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5c6bc0'
    },
    secondary: {
      main: '#e53935'
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{flex: 1}}>
          <Router>
              <Route path="/" exact component={Home} />
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
