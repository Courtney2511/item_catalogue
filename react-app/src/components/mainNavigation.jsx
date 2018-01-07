import React, { Component } from 'react'
import styles from '../../styles/main.scss'
import { Link } from 'react-router'
import { getCategories } from '../actions'
import { connect } from 'react-redux'

class MainNavigation extends Component {
	componentDidMount() {
		console.log(this.props)
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
								<Link to={`/categories/${category.id}`}>
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation)

// <li className={styles['nav-item']}>
//   <Link to={'/categories/1'}>ANIMALS</Link>
// </li>
// <li className={styles['nav-item']}>
//   <Link to="/categories/2">BLACK &amp; WHITE</Link>
// </li>
// <li className={styles['nav-item']}>
//   <Link to="/categories/3">LANDSCAPE</Link>
// </li>
// <li className={styles['nav-item']}>
//   <Link to="/categories/4">PEOPLE</Link>
// </li>
// <li className={styles['nav-item']}>
//   <Link to="/categories/5">FOOD</Link>
// </li>
