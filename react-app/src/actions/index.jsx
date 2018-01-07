// redux actions
import axios from 'axios'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SIGNUP_USER = 'SIGNUP_USER'
export const ADD_NEW_PHOTO = 'ADD_NEW_PHOTO'
export const GET_PHOTOS = 'GET_PHOTOS'
export const GET_PHOTO_DETAIL = 'GET_PHOTO_DETAIL'
export const CLEAR_PHOTO = 'CLEAR_PHOTO'
export const GET_USER_PHOTO_LIST = 'GET_USER_PHOTO_LIST'
export const DELETE_PHOTO = 'DELETE_PHOTO'
export const EDIT_PHOTO = 'EDIT_PHOTO'
export const CLEAR_NEW_PHOTO = 'CLEAR_NEW_PHOTO'
export const SET_NEW_PHOTO_ERRORS = 'SET_NEW_PHOTO_ERRORS'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export const LOGIN_WITH_FACEBOOK = 'LOGIN_WITH_FACEBOOK'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories() {
	const url = `${process.env.API_SERVER}/categories`
	const data = axios.get(url)
	return {
		type: GET_CATEGORIES,
		payload: data,
	}
}

// log in with Facebook
export function loginWithFacebook(fb_data) {
	const url = `${process.env.API_SERVER}/session/fblogin`
	const data = axios.post(url, fb_data)

	return {
		type: LOGIN_WITH_FACEBOOK,
		payload: data,
	}
}

// gets photos by user
export function getUserPhotoList(userId, jwtToken) {
	const url = `${process.env.API_SERVER}/users/${userId}/photos`
	const data = axios.get(url, {
		headers: {
			'X-Authorization': jwtToken,
		},
	})
	return {
		type: GET_USER_PHOTO_LIST,
		payload: data,
	}
}

// gets all photos
export function getPhotos() {
	const url = `${process.env.API_SERVER}/photos`
	const data = axios.get(url)
	return {
		type: GET_PHOTOS,
		payload: data,
	}
}

export function clearNewPhoto() {
	return {
		type: CLEAR_NEW_PHOTO,
	}
}

// clears photo
export function clearPhoto() {
	return {
		type: CLEAR_PHOTO,
	}
}

//clear photo message
export function clearMessage() {
	return {
		type: CLEAR_MESSAGE,
	}
}

// gets photo by id
export function getPhotoDetail(photoId) {
	const url = `${process.env.API_SERVER}/photos/${photoId}`
	const data = axios.get(url)

	return {
		type: GET_PHOTO_DETAIL,
		payload: data,
	}
}

// delete photo
export function deletePhoto(photoId, jwtToken) {
	const url = `${process.env.API_SERVER}/photos/${photoId}`
	const data = axios.delete(url, {
		headers: {
			'X-Authorization': jwtToken,
		},
	})

	return {
		type: DELETE_PHOTO,
		photoId: photoId,
		payload: data,
	}
}

// updates photo detail
export function editPhoto(
	photoId,
	userId,
	name,
	description,
	categoryId,
	url,
	jwtToken
) {
	const serverUrl = `${process.env.API_SERVER}/photos/${photoId}`
	const data = axios.put(
		serverUrl,
		{
			photoId: photoId,
			userId: userId,
			name: name,
			description: description,
			categoryId: categoryId,
			url: url,
		},
		{
			headers: {
				'X-Authorization': jwtToken,
			},
		}
	)

	return {
		type: EDIT_PHOTO,
		payload: data,
	}
}

// posts new photo to server
export function addNewPhoto(
	userId,
	name,
	description,
	categoryId,
	url,
	jwtToken
) {
	const serverUrl = `${process.env.API_SERVER}/photos`
	const data = axios.post(
		serverUrl,
		{
			userId: userId,
			name: name,
			description: description,
			categoryId: categoryId,
			url: url,
		},
		{
			headers: {
				'X-Authorization': jwtToken,
			},
		}
	)

	return {
		type: ADD_NEW_PHOTO,
		payload: data,
	}
}

// posts new user to server
export function signUpUser(username, email, password) {
	const url = `${process.env.API_SERVER}/users`
	const data = axios.post(url, {
		username: username,
		email: email,
		password: password,
	})

	return {
		type: SIGNUP_USER,
		payload: data,
	}
}

// log in user to server
export function logInUser(username, password) {
	// POST login credentials to server
	const url = `${process.env.API_SERVER}/session/new`
	const data = axios.post(url, {
		username: username,
		password: password,
	})

	return {
		type: LOGIN_USER,
		payload: data,
	}
}

// log out user
export function logOutUser(jwtToken) {
	const options = {
		headers: { 'X-Authorization': jwtToken },
	}

	const url = `${process.env.API_SERVER}/session/end`
	const data = axios.post(url, null, options)

	return {
		type: LOGOUT_USER,
		payload: data,
	}
}
