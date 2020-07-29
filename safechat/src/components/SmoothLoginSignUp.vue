<template>
	<div class="container">
		<div class="form">
			<login-form :pose="showLogin ? 'visible' : 'hidden'" class="login-form">
				<form @submit.prevent="login">
					<login-form-item class="login-form-item">
						<label>Email</label> <input :model="email" />
					</login-form-item>
					<login-form-item class="login-form-item">
						<label>Password</label> <input :model="password" type="password" />
					</login-form-item>
					<login-form-item class="login-form-item">
						<button>Login</button>
					</login-form-item>
				</form>
			</login-form>
		</div>
	</div>
</template>

<script>
import posed from 'vue-pose'

export default {
	data: () => ({
		showLogin: false,
	}),
	components: {
		LoginForm: posed.div({
			visible: {
				opacity: 1,
				y: 0,
				rotateY: 0,
				staggerChildren: 80,
				transition: {
					ease: 'easeOut',
					duration: 1000,
				},
			},
			hidden: {
				opacity: 0,
				y: 100,
				rotateY: 100,
				afterChildren: true,
				transition: {
					duration: 1200,
					ease: 'easeIn',
				},
			},
		}),
		LoginFormItem: posed.div({
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					ease: 'easeOut',
					delay: 200,
					duration: 700,
				},
			},
			hidden: { opacity: 0, y: 50 },
		}),
	},
	mounted() {
		this.showLogin = true
	},
}
</script>

<style>
body {
	display: flex;
	height: 100vh;
	padding: 0;
	margin: 0;
	justify-content: center;
	align-items: center;
	background: #000;
	perspective: 1000px;
	font-family: Lato, sans-serif;
	color: #3d3946;
	font-weight: 400;
}

.container {
	width: 100%;
	height: 60vh;
	text-align: center;
}

.form {
	display: inline-block;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
}

* {
	box-sizing: border-box;
}

.login-form {
	background: #f8f6fe;
	border-radius: 4px;
	width: 300px;
	padding: 24px;
	box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
	margin: 0;
}

.login-form-item {
	width: 100%;
	margin-bottom: 12px;
}

label {
	display: block;
	margin-bottom: 4px;
	font-size: 14px;
}

input {
	display: block;
	width: 100%;
	padding: 6px;
	font-size: 14px;
	border-radius: 2px;
	border: 1px solid #10b6a4;
}

input:focus {
	outline: none;
	box-shadow: 0;
}

button {
	display: block;
	width: 100%;
	padding: 10px;
	font-size: 14px;
	background: #10b6a4;
	color: #e8fdfa;
	font-weight: 300;
	letter-spacing: 0.1em;
	border-radius: 2px;
	border: 0;
	cursor: pointer;
	margin-top: 24px;
}
</style>
