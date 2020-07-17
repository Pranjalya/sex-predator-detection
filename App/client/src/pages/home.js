import React, { useState, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import io from 'socket.io-client'
import config from '../util/config'
import bg from '../util/bg.png'

import Chat from '../components/Chat'

import withStyles from '@material-ui/core/styles/withStyles'
import {
	Grid,
	Paper,
	Avatar,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
} from '@material-ui/core'

const styles = theme => ({
	paper: {
		minHeight: 'calc(100vh - 64px)',
		borderRadius: 0,
	},
	sidebar: {
		zIndex: 8,
		height: '100vh',
	},
	list: {
		height: '90vh',
		overflowY: 'auto',
	},
	avatar: {
		margin: theme.spacing(0, 3, 0, 1),
	},
	sidebarTitle: {
		backgroundColor: '#53BD40',
		color: 'white',
		fontSize: '1.2rem',
		fontWeight: 600,
		padding: '15px 0px 15px 0px',
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
	const [userOnChat, setUserOnChat] = useState('')

	let chatBottom = useRef(null)

	useEffect(() => {
		const reloadMessages = () => {
			axios
				.get(`/conversation/${conversation._id}`)
				.then(data => {
					setConversation(data.data)
					scrollToBottom()
				})
				.catch(err => console.log(err))
		}

		if (conversation) {
			reloadMessages()
		}
	}, [lastMessage])

	const scrollToBottom = () => {
		chatBottom.current.scrollIntoView({ behavior: 'smooth' })
	}

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
					<ListItem
						className={classes.listItem}
						key={index}
						onClick={() => {
							getConversation(item)
							setUserOnChat(item)
						}}
						button
					>
						<ListItemAvatar className={classes.avatar}>
							<Avatar>{item.handle.substring(0, 2).toUpperCase()}</Avatar>
						</ListItemAvatar>
						<ListItemText primary={item.handle} />
					</ListItem>
				)
			}
		})

	return (
		<div>
			<Grid container style={{ overflow: 'hidden' }}>
				<Grid item md={3} className={classes.sidebar}>
					<Paper className={classes.paper} square elevation={5}>
						<Paper square className={classes.sidebarTitle}>
							Users
						</Paper>
						<List className={classes.list}>{renderUsers}</List>
					</Paper>
				</Grid>
				<Grid
					item
					md={9}
					style={{
						background: `url(${bg})`,
						backgroundSize: 'cover',
						backfaceVisibility: '0.3',
					}}
				>
					{conversation && (
						<Chat
							user={user}
							conversation={conversation}
							userOnChat={userOnChat}
							chatBottom={chatBottom}
						/>
					)}
				</Grid>
			</Grid>
		</div>
	)
}

export default withStyles(styles)(Home)
