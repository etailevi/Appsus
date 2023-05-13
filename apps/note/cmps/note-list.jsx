const { Link } = ReactRouterDOM

import { NotePreview } from "../cmps/note-preview.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"
const { useEffect, useState } = React


export function NoteList({ notes, onRemoveNote, setNotes }) {


    // useEffect(() => {
    //     setActivatedEdit()
    // }, [activatedEdit])

    return (
        <ul className="note-wrapper clean-list columns">
            {notes.map(note =>
                <li key={note.id} className="note-item">
                    <section >
                        <NotePreview setNotes={setNotes} note={note} onRemoveNote={onRemoveNote} />
                    </section>
                </li>
            )}
            {/* onClick = {() => setActivatedEdit(true) */}
        </ul>
    )
}