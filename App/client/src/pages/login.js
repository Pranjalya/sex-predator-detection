import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Mui stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MuiTheme from '../util/Theme'

const styles = MuiTheme

class login extends Component {
	state = {
		email: '',
		password: '',
		loading: false,
		errors: {},
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	setAuthorizationHeader = token => {
		const IDToken = `${token}`
		localStorage.setItem('token', IDToken)
		axios.defaults.headers.common['token'] = IDToken
	}

	handleSubmit = event => {
		event.preventDefault()

		this.setState({ loading: true })

		const userData = {
			email: this.state.email,
			password: this.state.password,
		}

		axios
			.post('/user/login', userData)
			.then(res => {
				this.setAuthorizationHeader(res.data.token)
				this.setState({ errors: {}, loading: false })
				this.props.history.push('/')
			})
			.catch(err => {
				console.error(err.response)
				this.setState({ errors: err.response.data, loading: false })
			})
	}

	render() {
		const { classes } = this.props
		const { errors, loading } = this.state

		return (
			<Fragment>
				<Grid container className={classes.form}>
					<Grid item sm />
					<Grid item sm>
						<Typography variant='h2' className={classes.pageTitle}>
							Login
						</Typography>
						<form noValidate onSubmit={this.handleSubmit}>
							<TextField
								id='email'
								name='email'
								type='email'
								label='Email'
								variant='outlined'
								className={classes.textField}
								value={this.state.email}
								helperText={errors.email}
								error={errors.email ? true : false}
								onChange={this.handleChange}
								fullWidth
							/>

							<br />

							<TextField
								id='password'
								name='password'
								type='password'
								label='Password'
								variant='outlined'
								className={classes.textField}
								value={this.state.password}
								helperText={errors.password}
								error={errors.password ? true : false}
								onChange={this.handleChange}
								fullWidth
							/>

							<br />
							{errors.general && (
								<>
									<Typography
										variant='body2'
										color='error'
										className={classes.customError}
									>
										{errors.general}
									</Typography>
									<br />
								</>
							)}
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className={classes.button}
								disabled={loading}
							>
								LOGIN
								{loading && (
									<CircularProgress size={30} className={classes.progress} />
								)}
							</Button>
							<br />
							<br />
							<Typography variant='body2'>
								Don't have an account? Sign Up{' '}
								<Typography
									variant='body2'
									color='primary'
									component={Link}
									to='/signup'
								>
									here
								</Typography>
							</Typography>
						</form>
					</Grid>
					<Grid item sm />
				</Grid>
			</Fragment>
		)
	}
}

export default withStyles(styles)(login)
