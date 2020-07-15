import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import config from '../util/config'

const Chat = props => {
	const { classes, conversation } = props
	const socket = io(config[process.env.NODE_ENV].endpoint)

	return (
		<div>
			{conversation.messages &&
				conversation.messages.map((item, index) => (
					<div key={index}>
						{item.text} by {item.author}
					</div>
				))}
		</div>
	)
}

export default Chat
