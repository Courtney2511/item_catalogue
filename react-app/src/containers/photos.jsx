import React from 'react'
import styles from '../../styles/photo_index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import Photo from '../components/photo.jsx'

class Photos extends React.Component {
	componentDidMount() {
		this.props.actions.getPhotos()
	}

	render() {
		const { photos, actions } = this.props
		return (
			<div className={styles['photos']}>
				{// checks for error messages
				photos.errors ? (
					<div className={styles['server-errors']}>{photos.errors}</div>
				) : null}
				{// if photos exist, displays photos
				photos.list && photos.list.length > 0
					? photos.list.map(photo => (
							<Photo
								getUserPhotoList={actions.getUserPhotoList}
								key={photo.id}
								photo={photo}
							/>
						))
					: null}
			</div>
		)
	}
}

Photos.propTypes = {
	photos: React.PropTypes.object,
}

function mapStateToProps(state) {
	return {
		photos: state.photos,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)
