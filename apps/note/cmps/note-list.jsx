const { Link } = ReactRouterDOM

// import { NotePreview } from "../cmps/note-preview.jsx"

export function NoteList({ notes, onRemoveNote }) {
    console.log(notes)
    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    {/* <NotePreview note={note} /> */}
                    <section>
                        <div>{JSON.stringify({ note })}</div>
                        <button onClick={() => onRemoveNote(note.id)} >Remove Note</button>
                        <button><Link to={`/note/${note.id}`} >Details</Link ></button>
                        <button><Link to={`/note/edit/${note.id}`} >Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}