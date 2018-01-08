import React, { Component } from 'react'
import styles from '../../styles/main.scss'
import { Link } from 'react-router'
import { getCategories, setFilter } from '../actions'
import { connect } from 'react-redux'

class MainNavigation extends Component {
	componentDidMount() {
		this.props.getCategories()
	}
	render() {
		return (
			<div className={styles['navigation']}>
				<nav>
					<ul className={styles['nav-bar']}>
						<li className={styles['nav-item']}>
							<Link to={'/'}>ALL</Link>
						</li>
						{this.props.categories.map(category => (
							<li key={category.id} className={styles['nav-item']}>
								<Link
									to={`/categories/${category.id}`}
									onClick={() => this.props.setFilter(category.name)}
								>
									{category.name.toUpperCase()}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		categories: state.categories.categories,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCategories: () => dispatch(getCategories()),
		setFilter: category => dispatch(setFilter(category)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation)
