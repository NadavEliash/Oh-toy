const express = require('express')
const app = express()
app.use(express.static('public'))

const toyService = require('./services/toy.service.js')


// Query
app.get('/api/toy', (req, res) => {
    const { txt, maxPrice } = req.query
    const filterBy = { txt, maxPrice }
    toyService.query(filterBy).then(toys => {
        res.send(toys)
    })
})

// CREATE
app.post('/api/toy/save', (req, res) => {
    const {
        name,
        price,
        labels,
        createdAt,
        inStock,
        imgUrl
    } = req.body
    console.log(req.body)

    const toy = {
        name,
        price,
        labels,
        createdAt,
        inStock,
        imgUrl
    }

    toyService.save(toy)
        .then(savedToy => res.send(savedToy))
        .catch(err => res.status(403).send(err))
})

// UPDATE
app.put('/api/toy/save', (req, res) => {
    const {
        _id,
        name,
        price,
        labels,
        createdAt,
        inStock,
        imgUrl
    } = req.body

    const toy = {
        _id,
        name,
        price,
        labels,
        createdAt,
        inStock,
        imgUrl
    }

    toyService.save(toy)
        .then(savedToy => res.send(savedToy))
        .catch(err => res.status(403).send(err))
})


// READ
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => res.send(toy))
        .catch(err => res.status(403).send(err))
})


// DELETE
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(msg => { res.send({ msg, toyId }) })
        .catch(err => res.status(403).send(err))
})


app.listen(3030, () => console.log('Server listening on port 3030!'))
