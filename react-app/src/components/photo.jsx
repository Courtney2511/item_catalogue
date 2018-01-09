import React from 'react'
import { Link } from 'react-router'
import { formatUnixShortDate } from '../helpers/date'
import styles from '../../styles/photo_index.scss'

// photo as displayed in a list
export default function Photo(props) {
	return (
		<div className={styles['photo-div']}>
			<Link className={styles['photo-link']} to={'/photos/' + props.photo.id}>
				<img className={styles['photo']} src={props.photo.picture} />
			</Link>
			<div>
				<h3 className={styles['photo-title']}>{props.photo.name}</h3>
				<p className={styles['photo-desc']}>{props.photo.description}</p>
				<div className={styles['user']}>
					<span>
						<small>by: {props.photo.user.username}</small>
						<br />
						<small className={styles['photo-info']}>
							posted {formatUnixShortDate(props.photo.date_created)}{' '}
						</small>
					</span>
				</div>
			</div>
		</div>
	)
}
