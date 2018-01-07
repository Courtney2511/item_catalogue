import React from 'react'
import styles from '../../styles/photo_index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import PhotoUserProfile from '../components/photoUserProfile.jsx'

class UserPhotoList extends React.Component {
	componentDidMount() {
		const { user, actions } = this.props
		if (user.isLoggedIn) {
			actions.getUserPhotoList(user.userId, user.jwtToken)
		}
	}

	render() {
		const { user, photos, actions } = this.props
		return !user.isLoggedIn ? (
			<div>
				<h3 className={styles['page-title']}>Posts</h3>
				<div className={styles['no-posts']}>
					You must be logged in view your previous posts
				</div>
			</div>
		) : (
			<div>
				<h3 className={styles['page-title']}>Posts</h3>
				{// displays message when a photo is deleted
				photos.success ? (
					<div className={styles['message']}>{photos.message}</div>
				) : null}
				{// displays errors, if any
				photos.errors ? (
					<div className={styles['server-errors']}>{photos.errors}</div>
				) : null}
				{// displays errors, if any
				user.errors ? (
					<div className={styles['no-posts']}>{user.errors}</div>
				) : null}
				{// displays user photos, if any
				user.photos && user.photos.length > 0 ? (
					<div className={styles['photos']}>
						{user.photos.map(photo => (
							<PhotoUserProfile
								key={photo.id}
								photo={photo}
								deletePhoto={() => actions.deletePhoto(photo.id, user.jwtToken)}
							/>
						))}
					</div>
				) : null}
			</div>
		)
	}
}

UserPhotoList.propTypes = {
	user: React.PropTypes.object,
}

function mapStateToProps(state) {
	return {
		user: state.user,
		photos: state.photos,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPhotoList)
