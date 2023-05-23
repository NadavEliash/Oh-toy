import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'


import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from '../services/event-bus.service.js'

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load Toy')
                Navigate('/')
            })
    }

    
    if (!toy) return <div>Loading...</div>
    const inStockStatus = toy.inStock ? 'In stock' : 'Sold out'
    return (
        <section className="toy-details">
            <Link to="/">Back home</Link>
            <h1>{toy.name}</h1>
            <h4>price: {toy.price}</h4>
            <h4>{inStockStatus}</h4>
            <ul> <span>Labels:</span> 
                {toy.labels.map(label =>
                    <li key={toy.name + '/' + label}>{label}</li>
                )}
            </ul>
        </section>
    )
}