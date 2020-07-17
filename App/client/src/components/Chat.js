import React, { useState } from 'react'
import axios from 'axios'

import makeStyles from '@material-ui/core/styles/makeStyles'
import {
	Grid,
	Typography,
	TextField,
	IconButton,
	Paper,
} from '@material-ui/core'

import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
	},
	headerRow: {
		maxHeight: 60,
		zIndex: 5,
	},
	paper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		color: '#53BD40',
	},
	messageContainer: {
		height: '100%',
	},
	messagesRow: {
		maxHeight: '80vh',
		overflowY: 'auto',
	},
	newMessageRow: {
		width: '100%',
		padding: theme.spacing(0, 2, 1),
		background: '#efefef',
	},
	inputRow: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	form: {
		width: '100%',
	},
	avatar: {
		margin: theme.spacing(1, 1.5),
	},
	leftMsg: {
		margin: '5px 12px 5px 12px',
		padding: '5px 12px 5px 12px',
		borderRadius: '0px 8px 8px 8px',
		background: '#ffffff',
		border: '0.5px solid rgba(0,0,0,0.2)',
		maxWidth: '60%',
	},
	rightMsg: {
		margin: '5px 12px 5px 12px',
		padding: '5px 12px 5px 12px',
		borderRadius: '8px 0px 8px 8px',
		background: 'rgba(133,222,148,1)',
		border: '0.5px solid rgba(0,0,0,0.2)',
		maxWidth: '60%',
	},
	timeStamp: {
		color: '#777',
		fontSize: '0.7rem',
		fontWeight: '600',
	},
}))

const Chat = props => {
	const { conversation, user, userOnChat, chatBottom } = props

	const classes = useStyles()

	const [newMessage, setNewMessage] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		const msgBody = {
			conversationId: conversation._id,
			text: newMessage,
		}

		axios
			.post('/conversation/message', msgBody)
			.then(data => {
				console.log('message posted')
				setNewMessage('')
			})
			.catch(err => console.log(err))
	}

	return (
		<div style={{ height: '100vh', overflowY: 'auto' }}>
			<Grid container className={classes.root}>
				<Grid item xs={12} className={classes.headerRow}>
					<Paper className={classes.paper} square elevation={2}>
						<Typography color='inherit' variant='h6'>
							{userOnChat.handle.toUpperCase()}
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Grid container className={classes.messageContainer}>
						<Grid item xs={12} className={classes.messagesRow}>
							{conversation.messages &&
								conversation.messages.map(m => (
									<Grid
										container
										direction='row'
										justify={
											m.author === userOnChat._id ? 'flex-start' : 'flex-end'
										}
										alignItems='flex-end'
										style={{
											textAlign: 'right',
										}}
									>
										<Grid
											item
											className={
												m.author === userOnChat._id
													? classes.leftMsg
													: classes.rightMsg
											}
										>
											{m.text}
											<br />
											<Typography
												variant='caption'
												className={classes.timeStamp}
											>
												{m.time}
											</Typography>
										</Grid>
									</Grid>
								))}
							<div ref={chatBottom} />
						</Grid>
						<Grid item xs={12} className={classes.inputRow}>
							<form onSubmit={handleSubmit} className={classes.form}>
								<Grid
									container
									className={classes.newMessageRow}
									alignItems='flex-end'
								>
									<Grid item xs={11}>
										<TextField
											id='message'
											label='Message'
											variant='outlined'
											margin='dense'
											fullWidth
											value={newMessage}
											onChange={e => setNewMessage(e.target.value)}
										/>
									</Grid>
									<Grid item xs={1}>
										<IconButton type='submit'>
											<SendIcon color='primary' />
										</IconButton>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Chat
