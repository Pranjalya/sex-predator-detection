import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import home from './pages/home'
import login from './pages/login'
import register from './pages/register'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiTheme from './util/Theme'

import './App.css'

axios.defaults.baseURL = 'http://localhost:8080/'

const theme = createMuiTheme(MuiTheme)

const App = () => {
	return (
		<div className='App'>
			<MuiThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path='/' component={home} />
						<Route exact path='/login' component={login} />
						<Route exact path='register' component={register} />
					</Switch>
				</Router>
			</MuiThemeProvider>{' '}
		</div>
	)
}

export default App
