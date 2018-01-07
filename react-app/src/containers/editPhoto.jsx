import React from 'react'
import styles from '../../styles/form.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../actions'
import EditPhotoForm from '../components/forms/editPhotoForm'

class EditPhoto extends React.Component {
	componentDidMount() {
		const { actions, params } = this.props
		actions.clearPhoto()
		actions.getPhotoDetail(params.photoId)
	}

	handleSubmit(values) {
		const { actions, user } = this.props
		actions.editPhoto(
			values.id,
			values.user.id,
			values.name,
			values.description,
			values.category.id,
			values.picture,
			user.jwtToken
		)
		actions.getUserPhotoList(values.user.id, user.jwtToken)
		browserHistory.push(`/photos/${values.id}`)
	}

	render() {
		const { photos, user } = this.props
		return (
			<div className={styles['form-container']}>
				<div className={styles['form-header']}>
					<h2>Need to make some changes?</h2>
				</div>
				{// displays server error, if any
				photos.error ? <div>{photos.error}</div> : null}
				{photos.photoDetail && user.isLoggedIn ? (
					<EditPhotoForm
						photo={photos.photoDetail}
						handleSubmit={event => this.handleSubmit(event)}
					/>
				) : (
					<div>Log in to edit your photos</div>
				)}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		photos: state.photos,
		user: state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPhoto)
