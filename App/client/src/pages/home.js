import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const Home = props => {
	useEffect(() => {
		const token = localStorage.token
		if (token) {
			const decodedToken = jwtDecode(token)
			if (decodedToken.exp * 1000 < Date.now()) {
				props.history.push('/login')
			} else {
				axios.defaults.headers.common['token'] = token
			}
		} else {
			props.history.push('/login')
		}
	})

	return (
		<div>
			<Grid container direction='row' justify='flex-start' alignItems='stretch'>
				<Grid item style={{ width: '35vw', background: 'green' }}>
					Users
				</Grid>
				<Grid item style={{ width: '65vw', background: 'yellow' }}>
					Chat
				</Grid>
			</Grid>
		</div>
	)
}

export default Home
