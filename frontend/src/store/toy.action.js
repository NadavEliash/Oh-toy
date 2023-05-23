import { toyService } from "../services/toy.service.js"
import { store } from './store.js'


export function loadToys(filterBy) {
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: 'SET_TOYS', toys })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: 'REMOVE_TOY', toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? 'UPDATE_TOY' : 'ADD_TOY'
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}