import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { store } from "../store/store.js"

import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'

export function ToyEdit() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const labels = useSelector(storeState => storeState.labels)
    // let owner = useSelector(storeState => storeState.user ? storeState.user.username : 'anonymous')

    useEffect(() => {
        toyId
            ? toyService.getById(toyId).then(setToy)
            : setToy(toyService.getEmptyToy())
    }, [toyId])


    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setToy(prevToy => ({ ...prevToy, [field]: value }))
    }

    function toggleInStock() {
        setToy(prevToy => ({ ...prevToy, inStock: !toy.inStock }))
    }

    function onLabelChecked({ target }) {
        if (target.checked) {
            toy.labels.push(target.name)
        } else {
            const idx = toy.labels.indexOf(target.name)
            toy.labels.splice(idx, 1)
        }

        setToy(prevToy => ({ ...prevToy, }))
    }

    function onSaveToy() {
        saveToy(toy)
            .then(() =>
                navigate('/')
            )
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSaveToy()
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="edit-toy">
            <form className="edit-toy-form" onSubmit={onSubmit}>
                <label className="name" htmlFor="name">
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name" id="name"
                        placeholder="Toy's name"
                        value={toy.name} />
                </label>
                <label className="price" htmlFor="price">
                    <input
                        onChange={handleChange}
                        type="number"
                        name="price" id="price"
                        placeholder="price"
                        value={toy.price} />
                </label>
                {toy.inStock && <label className="inStock" htmlFor="inStock">
                    In stock
                    <input
                        onChange={toggleInStock}
                        type="checkbox"
                        name="inStock" id="inStock"
                        checked
                    />
                </label>}
                {!toy.inStock && <label className="inStock" htmlFor="inStock">
                    In stock
                    <input
                        onChange={toggleInStock}
                        type="checkbox"
                        name="inStock" id="inStock"
                    />
                </label>}
                <label className="imgURL" htmlFor="imgURL">
                    <input
                        onChange={handleChange}
                        type="text"
                        name="imgURL" id="imgURL"
                        placeholder="Add an image URL"
                        value={toy.imgURL} />
                </label>
            </form>
            <section className="label-selector">
                {labels.map(label => (
                    <div key={label}>
                        {toy.labels.includes(label) && <input
                            type="checkbox"
                            name={label} id={label}
                            onChange={onLabelChecked}
                            checked
                        />}
                        {(!toy.labels.includes(label)) && <input
                            type="checkbox"
                            name={label} id={label}
                            onChange={onLabelChecked}
                        />}
                        {label}
                    </div>))}
            </section>
            <div className="edit-toy-footer">
                <button onClick={onSaveToy}>
                    Save
                </button>
                <Link to="/">Return</Link>
            </div>
        </section>
    )
}


