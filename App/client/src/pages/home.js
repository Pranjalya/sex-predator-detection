import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import io from 'socket.io-client'
import config from '../util/config'

import Chat from '../components/Chat'

import withStyles from '@material-ui/core/styles/withStyles'
import { Grid, Typography, Button, Divider, AppBar } from '@material-ui/core'

const styles = theme => ({
	header: {
		backgroundColor: 'rgba(177, 9, 235, 0.58)',
		position: 'fixed',
		width: '25vw',
		padding: '15px 0px 15px 0px',
		color: 'white',
		textAlign: 'center',
		boxShadow: '1px black',
	},
	paperButton: {
		// margin: '0px 5% 0px 5%',
		textTransform: 'none',
		width: '80%',
		marginBottom: '10px',
	},
})

const Home = props => {
	const { classes } = props
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState({})
	const [allUsers, setAllUsers] = useState([])
	const [errors, setErrors] = useState({})
	const [conversation, setConversation] = useState()
	const [lastMessage, setLastMessage] = useState('')

	useEffect(() => {
		const reloadMessages = () => {
			axios
				.get(`/conversation/${conversation._id}`)
				.then(data => {
					setConversation(data.data)
				})
				.catch(err => console.log(err))
		}

		if (conversation) {
			reloadMessages()
		}
	}, [lastMessage])

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

	useEffect(() => {
		axios
			.get('/user/me')
			.then(data => {
				setUser(data.data)
			})
			.catch(er => {
				setErrors(err => ({ ...err, user: er }))
			})
		axios
			.get('/user/all')
			.then(data => {
				setAllUsers(data.data)
				setLoading(false)
			})
			.catch(er => {
				setErrors(err => ({ ...err, users: er }))
			})

		const socket = io(config[process.env.NODE_ENV].endpoint)
		socket.on(`Message`, item => setLastMessage(item))
	}, [])

	const getConversation = item => {
		axios
			.get(`/conversation/conv/${item._id}`)
			.then(data => {
				setConversation(data.data)
			})
			.catch(err => console.log(err))
	}

	const renderUsers =
		!loading &&
		allUsers.length > 1 &&
		allUsers.map((item, index) => {
			if (item._id !== user._id) {
				return (
					<>
						<Grid item key={index}>
							<Button
								onClick={() => getConversation(item)}
								className={classes.paperButton}
							>
								<Typography variant='body1'>{item.handle}</Typography>
							</Button>
							<Divider />
						</Grid>
					</>
				)
			}
		})

	return (
		<div>
			<Grid container direction='row' justify='flex-start' alignItems='stretch'>
				<Grid
					item
					style={{ width: '25vw', height: '100vh', backgroundColor: '#efefef' }}
				>
					<div className={classes.header}>
						<Typography variant='h5'>Chats</Typography>
					</div>
					<Grid
						container
						direction='column'
						justify='center'
						alignItems='center'
						spacing={3}
						style={{ marginTop: '80px' }}
					>
						{renderUsers}
					</Grid>
				</Grid>
				<Grid
					item
					style={{
						width: '75vw',
						height: '100vh',
						background: 'yellow',
						overflowY: 'scroll',
					}}
				>
					{conversation &&
						conversation.messages &&
						conversation.messages.map((item, index) => (
							<div key={index}>
								{item.text} by {item.author}
							</div>
						))}
				</Grid>
			</Grid>
		</div>
	)
}

export default withStyles(styles)(Home)
