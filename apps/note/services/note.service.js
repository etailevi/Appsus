// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getNextNoteId,
    getPreviousNoteId,
    getEmptyNote,
}

const NOTE_KEY = 'noteDB'
const gNotes = [
    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#FFD1D1'
        },
        info: {
            title: 'Happy Day',
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: './assets/img/imgs-notes/Prince Charmer.jpg',
            title: 'Bobi and Me',
            txt: utilService.makeLorem(20)
        },
        style: {
            backgroundColor: '#FBFFDE'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTxt',
        isPinned: false,
        info: {
            // url: 'http://some-img/me',
            title: 'Get a haircut',
            txt: utilService.makeLorem(10)
        },
        style: {
            backgroundColor: '#D7FDDF'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTxt',
        isPinned: false,
        info: {
            // url: 'http://some-img/me',
            title: 'Buy some new T-shirts',
            txt: utilService.makeLorem(19)
        },
        style: {
            backgroundColor: '#E0FFFD'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTxt',
        isPinned: false,
        info: {
            // url: 'http://some-img/me',
            title: 'Survive sprint 3',
            txt: utilService.makeLorem(13)
        },
        style: {
            backgroundColor: '#D0D0FE'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTxt',
        isPinned: false,
        info: {
            // url: 'http://some-img/me',
            title: 'Get married',
            txt: utilService.makeLorem(20)
        },
        style: {
            backgroundColor: '#F9DEFF'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTxt',
        isPinned: false,
        info: {
            // url: 'http://some-img/me',
            title: 'Eat lunch with my sister',
            txt: utilService.makeLorem(20)
        },
        style: {
            backgroundColor: 'lightgray'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTxt',
        isPinned: false,
        info: {
            // url: 'http://some-img/me',
            title: 'Travel to Paris',
            txt: utilService.makeLorem(8)
        },
        style: {
            backgroundColor: 'white'
        }
    },
    {
        id: utilService.makeId(),
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

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.info.title))
            }
            if (filterBy.type) {
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
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getDefaultFilter() {
    return { title: '', type: '' }
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

function getEmptyNote() {
    return {
        id: '',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            title: '',
            txt: ''
        }
    }
}