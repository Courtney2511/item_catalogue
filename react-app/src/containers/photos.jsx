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
		const { photos, actions, filterBy } = this.props
		let photoList = photos.list

		if (filterBy !== null) {
			photoList = photos.list.filter(photo => photo.category.name === filterBy)
			console.log(photos.list)
		}

		return (
			<div className={styles['photos']}>
				{// checks for error messages
				photos.errors ? (
					<div className={styles['server-errors']}>{photos.errors}</div>
				) : null}
				{// if photos exist, displays photos
				photoList && photoList.length > 0
					? photoList.map(photo => (
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
		filterBy: state.categories.filterBy,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)
