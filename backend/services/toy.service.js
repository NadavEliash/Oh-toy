const fs = require('fs')
var toys = require('../data/toys.json')

module.exports = {
    query,
    get,
    remove,
    save
}

const PAGE_SIZE = 4

function query(filterBy = {}, sortBy = {}, pageNum = 1) {
    let toysToDisplay = toys
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.maxPrice) {
        toysToDisplay = toysToDisplay.filter(toy => toy.price <= filterBy.maxPrice)
    }

    if (sortBy.sort === 'price') {
        toysToDisplay.sort((a, b) => (a.price - b.price) * sortBy.desc)
    } else {
        toysToDisplay.sort((a, b) => (a.createdAt - b.createdAt) * sortBy.desc)
    }

    const startFrom = (pageNum - 1) * PAGE_SIZE
    const toysToPage = toysToDisplay.slice(startFrom, startFrom + PAGE_SIZE)

    return Promise.resolve(toysToPage)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId) {
    console.log(toys)
    toys = toys.filter(toy => toy._id !== toyId)
    console.log(toys)
    
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        toyToUpdate = {...toyToUpdate, ...toy}
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
        fs.writeFile('../data/toy.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}

