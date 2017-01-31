import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Theme from './styles/Theme'
import AllComponentsViewPage from './pages/AllComponentsViewPage'

export default class Static extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={Theme}>
        <AllComponentsViewPage/>
      </MuiThemeProvider>
    )
  }
}