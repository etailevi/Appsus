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
                        <h1>{note.info.title}</h1>
                        <p>{note.info.txt}</p>
                        <button onClick={() => onRemoveNote(note.id)} ><img src="./assets/img/imgs-notes/trash.svg" alt="Trash" /></button>
                        <button><Link to={`/note/${note.id}`} >Details</Link ></button>
                        <button><Link to={`/note/edit/${note.id}`} >Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}