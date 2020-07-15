import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Mui stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MuiTheme from '../util/Theme'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = MuiTheme

class Register extends Component {
	state = {
		email: '',
		password: '',
		confirmPassword: '',
		handle: '',
		errors: {},
	}

	setAuthorizationHeader = token => {
		const IDToken = `${token}`
		localStorage.setItem('token', IDToken)
		axios.defaults.headers.common['token'] = IDToken
	}

	handleSubmit = event => {
		event.preventDefault()

		this.setState({
			loading: true,
		})

		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle,
		}

		axios
			.post('/user/signup', newUserData)
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

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	render() {
		const { classes } = this.props
		const { errors, loading } = this.state

		console.log(errors)

		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<Typography variant='h2' className={classes.pageTitle}>
						Signup
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id='email'
							name='email'
							type='email'
							label='Email'
							variant='outlined'
							InputLabelProps={{
								shrink: true,
							}}
							className={classes.textField}
							value={this.state.email}
							helperText={errors.email}
							error={errors.email ? true : false}
							onChange={this.handleChange}
							fullWidth
						/>

						<TextField
							id='password'
							name='password'
							type='password'
							label='Password'
							className={classes.textField}
							variant='outlined'
							InputLabelProps={{
								shrink: true,
							}}
							value={this.state.password}
							helperText={errors.password}
							error={errors.password ? true : false}
							onChange={this.handleChange}
							fullWidth
						/>

						<TextField
							id='confirmPassword'
							name='confirmPassword'
							type='password'
							label='Confirm Password'
							className={classes.textField}
							variant='outlined'
							InputLabelProps={{
								shrink: true,
							}}
							value={this.state.confirmPassword}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							onChange={this.handleChange}
							fullWidth
						/>

						<TextField
							id='handle'
							name='handle'
							type='text'
							label='Handle'
							className={classes.textField}
							variant='outlined'
							InputLabelProps={{
								shrink: true,
							}}
							value={this.state.handle}
							helperText={errors.handle}
							error={errors.handle ? true : false}
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
							</>
						)}

						<Button
							type='submit'
							variant='contained'
							color='primary'
							className={classes.button}
							disabled={loading}
						>
							signup
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
						<br />
						<br />
						<Typography variant='body2'>
							Already have an account? Login{' '}
							<Typography
								variant='body2'
								color='primary'
								component={Link}
								to='/login'
							>
								here
							</Typography>
						</Typography>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		)
	}
}

export default withStyles(styles)(Register)
