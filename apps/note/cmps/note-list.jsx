const { Link } = ReactRouterDOM

import { NotePreview } from "../cmps/note-preview.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"
const { useEffect, useState } = React


export function NoteList({ notes, onRemoveNote }) {

    const [activatedEdit, setActivatedEdit] = useState(false)

    // useEffect(() => {
    //     setActivatedEdit()
    // }, [activatedEdit])

    return (
        <ul className="note-wrapper clean-list columns">
            {notes.map(note =>
                <li key={note.id} className="note-item">
                    <section onClick={() => setActivatedEdit(true)} >
                        {!!activatedEdit && <NoteEdit setActivatedEdit={setActivatedEdit} />}
                        <NotePreview note={note} onRemoveNote={onRemoveNote} />
                    </section>
                </li>
            )}
        </ul>
    )
}