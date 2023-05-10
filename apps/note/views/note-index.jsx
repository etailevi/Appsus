const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteList } from "../cmps/note-list.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query(setNotes)
    }

    function handleChange() {

    }

    function onAddNote() {

    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            showSuccessMsg(`Note removed!`)

        })
    }

    return (
        <section>
            <form onSubmit={onAddNote}>
                <label htmlFor="title"></label>
                <input value="" onChange={handleChange} name="title" id="title" type="text" placeholder="Enter your text here" />
                <button>Add Note</button>
            </form>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />

        </section>
    )
}

