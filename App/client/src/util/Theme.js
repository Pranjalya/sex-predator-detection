const MuiTheme = {
	palette: {
		common: {
			black: '#000',
			white: '#fff',
		},
		background: {
			paper: '#fff',
			default: '#fafafa',
		},
		primary: {
			light: '#67DD51',
			main: '#53BD40',
			dark: '#439634',
			contrastText: '#fff',
		},
		secondary: {
			light: 'rgba(255, 160, 0, 0.63)',
			main: 'rgba(255, 160, 0, 1)',
			dark: 'rgba(207, 133, 5, 1)',
			contrastText: '#fff',
		},
		error: {
			light: '#e57373',
			main: '#f44336',
			dark: '#d32f2f',
			contrastText: '#fff',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)',
		},
	},
	form: {
		textAlign: 'center ',
	},
	appLogo: {
		maxWidth: 300,
		margin: '1px auto 15px auto',
	},
	pageTitle: {
		margin: '10px auto 10px auto',
	},
	textField: {
		margin: '10px auto 10px auto',
		width: '350px',
	},
	button: {
		marginTop: 20,
		position: 'relative',
	},
	customError: {
		fontSize: '0.8rem',
		fontWeight: 600,
		margin: 10,
	},
	progress: {
		position: 'absolute',
	},
}

export default MuiTheme
