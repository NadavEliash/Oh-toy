import { storageService } from "./async-storage.service.js"
import { localStorageService } from "./storage.service.js"
import { utilService } from "./util.service.js"

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

function query(filterBy) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!toys.length) toys = _createDemoToys()
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.labels.length) {
                toys = toys.filter(toy =>
                    toy.labels.some(label =>
                        filterBy.labels.includes(label)
                    )
                )
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 30,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        imgURL: '',
    }
}

function _createDemoToys() {
    const toys = [
        { ...getEmptyToy(), _id: 'a123', name: 'Talking Doll', price: 103, labels: ['Doll', 'Battery Powered', 'Baby'] },
        { ...getEmptyToy(), _id: 'b345', name: 'Remote Jeep', price: 144, labels: ['Battery Powered', 'Outdoor'] },
    ]

    localStorageService.saveToStorage(STORAGE_KEY, toys)
    return toys
}