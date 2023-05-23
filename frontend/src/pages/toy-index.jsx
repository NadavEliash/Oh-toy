import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { store } from "../store/store.js"

import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToyList } from '../cmps/toy-list.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'

export function ToyIndex() {
    let toys = useSelector(storeState => storeState.toys)
    let filterBy = useSelector(storeState => storeState.filterBy)
    const dispatch = useDispatch()


    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onFilterBy(filterBy) {
        store.dispatch({ type: 'CHANGE_FILTER_BY', filterBy })
    }

    function onEditToy(toy) {
        saveToy(toy).then(() => {
            showSuccessMsg('Toy updated')
        })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    return (
        <section className="toy-index">
            <Link to="/edit" className="add-toy">add toy</Link>
            <ToyFilter filterBy={filterBy} onFilterBy={onFilterBy} />
            <ToyList
                className="toy-list"
                toys={toys}
                onEditToy={onEditToy}
                onRemoveToy={onRemoveToy}
                // onToggleIsDone={onToggleIsDone}
                 />
        </section>
    )
}