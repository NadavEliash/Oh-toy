const fs = require('fs')
var toys = require('../data/toys.json')

module.exports = {
    query,
    get,
    remove,
    save
}

const PAGE_SIZE = 4

function query(filterBy = {}) {
    let toysToDisplay = toys

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
    }

    if (filterBy.maxPrice) {
        toysToDisplay = toysToDisplay.filter(toy => toy.price <= filterBy.maxPrice)
    }

    if (filterBy.labels) {
        toysToDisplay = toysToDisplay.filter(toy =>
            toy.labels.some(label =>
                filterBy.labels.includes(label)
            ))
    }

    if (filterBy.sort.item) {
        const item = filterBy.sort.item
        toysToDisplay.sort((a, b) => (a[item] - b[item]) * filterBy.sort.desc)
    }


    // const startFrom = (pageNum - 1) * PAGE_SIZE
    // const toysToPage = toysToDisplay.slice(startFrom, startFrom + PAGE_SIZE)

    return Promise.resolve(toysToDisplay)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId) {
    toys = toys.filter(toy => toy._id !== toyId)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        let toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        toyToUpdate = { ...toyToUpdate, ...toy }
    } else {
        toy._id = _makeId()
        toy.createdAt = Date.now()
        toys.push(toy)
    }

    return _saveToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(toys, null, 2)
        fs.writeFile('../backend/data/toys.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}

