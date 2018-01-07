import { GET_CATEGORIES } from '../actions'

const initialState = {
	categories: null,
}

export default function categories(state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload.data,
			}
		default:
			return state
	}
}
