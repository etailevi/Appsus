// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todo: [
                { txt: 'Driving License', doneAt: null },
                { txt: 'Coding Power', doneAt: 187111111 }
            ]
        }
    }
]

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getNextNoteId,
    getPreviousNoteId,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.info.title))
            }
            if (filterBy.type) {
                console.log('hello')
                notes = notes.filter(note => note.type === filterBy.type)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // return axios.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    console.log('note from save', note)
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getDefaultFilter() {
    // return { title: '', maxPrice: '' }
}

function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY)
        .then((notes) => {
            let noteIdx = notes.findIndex(note => note.id === noteId)
            if (noteIdx === notes.length - 1) noteIdx = -1
            return notes[noteIdx + 1].id
        })
}

function getPreviousNoteId(noteId) {
    return storageService.query(NOTE_KEY)
        .then((notes) => {
            let noteIdx = notes.findIndex(note => note.id === noteId)
            if (noteIdx === 0) noteIdx = notes.length - 1
            return notes[noteIdx - 1].id
        })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) notes = gNotes
    utilService.saveToStorage(NOTE_KEY, notes)
}

