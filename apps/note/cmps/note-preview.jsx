const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteTxt } from "../cmps/note-txt.jsx"
import { NoteImg } from "../cmps/note-img.jsx"
import { NoteVideo } from "../cmps/note-video.jsx"
import { NoteTodos } from "../cmps/note-todos.jsx"
import { ColorInput } from "./dynamic-inputs/color-input.jsx"


export function NotePreview({ note, onRemoveNote }) {
    const [cmpType, setCmpType] = useState('color')
    const [noteStyle, setNoteStyle] = useState({ backgroundColor: 'pink', })

    function onSetNoteStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    return (
        <section style={noteStyle} className="note-container">
            <article className="note-card">
            <button className="note-pin" onClick={() => onRemoveNote(note.id)} ><img src="./assets/img/imgs-notes/pin.svg" alt="Pin Note" /></button>
                {!!note.info && <h1>{note.info.title}</h1>}
                {!!note.info && <p>{note.info.txt}</p>}
                <button className="note-trash" onClick={() => onRemoveNote(note.id)} ><img src="./assets/img/imgs-notes/trash.svg" alt="Trash" /></button>
            </article>
            <NoteTxt />
            <NoteImg />
            <NoteVideo />
            <NoteTodos />
            <DynamicCmp cmpType={cmpType} name="Muki" onSetNoteStyle={onSetNoteStyle} />
        </section>
    )
}

function DynamicCmp(props) {
    return <ColorInput {...props} />
}