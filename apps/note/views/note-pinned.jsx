const { useEffect, useState, useRef } = React
const { Link } = ReactRouterDOM

import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { ThreeDots } from "../cmps/note-three-dots.jsx"

export function PinnedNotes() {

    const [notes, setNotes] = useState([])
    const [visible, setVisible] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [visible])

    function loadNotes() {
        noteService.query(filterBy).then(setNotes)
    }


    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            showSuccessMsg(`Note removed!`)
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onChangeVisible() {
        setVisible(prevIsVisible => !prevIsVisible)
    }

    return (
        <section className="note-index full main-layout">
            {!visible &&
                <ul onClick={() => onChangeVisible()} className="note-input clean-list flex align-center justify-center" >
                    <div className="add-note-bar">
                        <li>
                            <input type="text" name="" id="" placeholder="What's on your mind..." />
                        </li>
                        <li className="add-note-opts flex row align-center">
                            <button><img src="./assets/img/imgs-notes/phrase.svg" alt="text-input" /></button>
                            <button><img src="./assets/img/imgs-notes/input-image.svg" alt="input-image" /></button>
                            <button><img src="./assets/img/imgs-notes/youtube.svg" alt="youtube-input" /></button>
                            {!clicked && <button><img src="./assets/img/imgs-notes/three-dots.svg" alt="three-dots" /></button>}
                            {!!clicked && <ThreeDots />}
                        </li>
                    </div>
                </ul>
            }
            {visible &&
                <NoteAdd onAddNote={onAddNote} />
            }
            <NoteFilter DynamicCmp onSetFilter={onSetFilter} filterBy={filterBy} />
            <NoteList setNotes={setNotes} notes={notes} onRemoveNote={onRemoveNote} />
        </section >
    )
}