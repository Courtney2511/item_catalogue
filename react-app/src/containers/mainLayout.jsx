import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import styles from '../../styles/main.scss'
import MainNavigation from '../components/MainNavigation.jsx'
import Dashboard from '../components/Dashboard.jsx'
import LoginPanel from '../components/loginPanel.jsx'

class MainLayout extends React.Component {
	render() {
		const { user, actions } = this.props
		return (
			<container>
				<header>
					<div className={styles['main-header']}>
						<div className={styles['header-left']}>
							<h1 className={styles['title']}>
								<i className="fa fa-bomb fa-lg" aria-hidden="true" />PHOTOBOMB
							</h1>
						</div>
						<div className={styles['header-right']}>
							{// displays dashboard or login panel based on log in status
							user.isLoggedIn ? (
								<Dashboard
									user={user}
									actions={{ logOutUser: actions.logOutUser }}
								/>
							) : (
								<LoginPanel />
							)}
						</div>
					</div>
					<MainNavigation />
				</header>
				<main>{this.props.children}</main>
			</container>
		)
	}
}

MainLayout.propTypes = {
	user: React.PropTypes.object,
}

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
