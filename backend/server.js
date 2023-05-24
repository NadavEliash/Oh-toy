const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

const toyService = require('./services/toy.service.js')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use(express.json())

// Query
app.get('/api/toy', (req, res) => {
    const { txt, maxPrice, labels, sort } = req.query
    const filterBy = { txt, maxPrice, labels, sort }
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


const port = process.env.PORT || 3030

// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

app.listen(port, () => console.log(`Server listening on port ${port}!`))