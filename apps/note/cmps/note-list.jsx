const { Link } = ReactRouterDOM

import { NotePreview } from "../cmps/note-preview.jsx"

export function NoteList({ notes, onRemoveNote }) {
    console.log(notes)
    return (
        <ul className="clean-list columns">
            {notes.map(note =>
                <li key={note.id} className="note-item">
                    <section>
                    <NotePreview note={note} />
                        <button onClick={() => onRemoveNote(note.id)} >Remove Note</button>
                        <button><Link to={`/note/${note.id}`} >Details</Link ></button>
                        <button><Link to={`/note/edit/${note.id}`} >Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}