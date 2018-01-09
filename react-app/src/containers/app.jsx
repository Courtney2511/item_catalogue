// Container Component

import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import '../../styles/main.scss'
import Photos from './photos.jsx'
import newPhotoForm from '../components/forms/newPhotoForm.jsx'
import mainLayout from '../containers/mainLayout.jsx'
import PhotoDetail from '../containers/photoDetail.jsx'
import signUpForm from '../components/forms/signUpForm.jsx'
import loginForm from '../components/forms/loginForm.jsx'
import facebookLogin from '../components/facebookLogin.jsx'
import UserPhotoList from './userPhotoList.jsx'
import EditPhotoForm from '../containers/editPhoto.jsx'

export default class App extends React.Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route component={mainLayout}>
					<Route path="/users/:userId" component={UserPhotoList} />
					<Route
						path="/users/:userId/photos/:photoId"
						component={EditPhotoForm}
					/>
					<Route path="/" component={Photos} />
					<Route path="/photos/new" component={newPhotoForm} />
					<Route path="/photos/:photoId" component={PhotoDetail} />
					<Route path="/signup" component={signUpForm} />
					<Route path="/login" component={loginForm} />
					<Route path="/facebooklogin" component={facebookLogin} />
				</Route>
			</Router>
		)
	}
}
