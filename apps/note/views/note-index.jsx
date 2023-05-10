const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [visible, setVisible] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy, visible])

    function loadNotes() {
        noteService.query(filterBy).then(setNotes)
        console.log('entered load notes')
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

    // function onClickInput() {
    //     setVisible(true)
    // }

    return (
        <section className="note-index full main-layout">
            {!visible &&
                <ul className="note-input clean-list flex align-center justify-center" >
                    <div class="add-note-bar">
                        <li>
                            <input type="text" name="" id="" placeholder="Add a new note here..." />
                        </li>
                        <li className="add-note-opts flex row align-center">
                            <button><img src="../../../assets/img/imgs-notes/input-check.svg" alt="input-check" /></button>
                            <button><img src="../../../assets/img/imgs-notes/input-brush.svg" alt="input-brush" /></button>
                            <button><img src="../../../assets/img/imgs-notes/input-image.svg" alt="input-image" /></button>
                        </li>
                    </div>
                </ul>}
            {visible && <NoteAdd />}
            <NoteFilter DynamicCmp onSetFilter={onSetFilter} filterBy={filterBy} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section >
    )
}

