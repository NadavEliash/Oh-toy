
import { legacy_createStore as createStore } from 'redux'

const initialState = {
    toys: [],
    filterBy: {
        txt: '',
        labels: []
    },
    labels: [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
        'Battery Powered'
    ]
}

function appReducer(state = initialState, action) {

    let toys

    switch (action.type) {
        // TOYS
        case 'CHANGE_FILTER_BY':
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'ADD_TOY':
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case 'UPDATE_TOY':
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        // USER
        case 'SET_USER':
            return { ...state, user: action.user }
        default:
            return { ...state }
    }

}

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
export const store = createStore(appReducer, middleware)