import React from 'react'
import styles from '../../styles/photo_index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import { formatUnixShortDate } from '../helpers/date'

function Photo(props) {
	return (
		<div className={styles['photo-detail-div']}>
			<h2>{props.photo.name}</h2>
			<small>
				Posted: {formatUnixShortDate(props.photo.date_created)} by:{' '}
				{props.photo.user.username}
			</small>
			<img className={styles['photo']} src={props.photo.picture} />
			<p>{props.photo.description}</p>
			<p />
		</div>
	)
}

class PhotoDetail extends React.Component {
	componentDidMount() {
		const { actions, params } = this.props
		actions.clearPhoto()
		actions.getPhotoDetail(params.photoId)
	}

	render() {
		const { photos } = this.props
		return (
			<div>
				{// displays errrors
				photos.errors ? (
					<div className={styles['server-errors']}>{photos.errors}</div>
				) : null}
				{// displays photo detail
				photos.photoDetail ? <Photo photo={photos.photoDetail} /> : null}
			</div>
		)
	}
}

PhotoDetail.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)
