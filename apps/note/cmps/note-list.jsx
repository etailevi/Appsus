const { Link } = ReactRouterDOM

import { NotePreview } from "../cmps/note-preview.jsx"

export function NoteList({ notes, onRemoveNote }) {
    return (
        <ul className="note-wrapper clean-list columns">
            {notes.map(note =>
                <li key={note.id} className="note-item">
                    <section>
                        <NotePreview note={note} onRemoveNote={onRemoveNote} />
                    </section>
                </li>
            )}
        </ul>
    )
}