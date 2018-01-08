import { GET_CATEGORIES, SET_FILTER, REMOVE_FILTER } from '../actions'

const initialState = {
	categories: null,
	filterBy: null,
}

export default function categories(state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload.data,
			}
		case SET_FILTER:
			return {
				...state,
				filterBy: action.payload,
			}
		case REMOVE_FILTER:
			return {
				...state,
				filterBy: null,
			}
		default:
			return state
	}
}
