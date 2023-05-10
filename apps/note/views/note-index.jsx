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
                <ul className="note-input flex" >
                    <input type="text" name="" id="" placeholder="Enter a note.." />
                    <li>
                        <img src="../../../assets/img/imgs-notes/input-check.svg" alt="" />
                        <img src="../../../assets/img/imgs-notes/input-brush.svg" alt="" />
                        <img src="../../../assets/img/imgs-notes/input-image.svg" alt="" />
                    </li>
                </ul>}
            {visible && <NoteAdd />}
            <NoteFilter DynmicCmp onSetFilter={onSetFilter} filterBy={filterBy} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}

