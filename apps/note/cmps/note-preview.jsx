const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteTxt } from "../cmps/note-txt.jsx"
import { NoteImg } from "../cmps/note-img.jsx"
import { NoteVideo } from "../cmps/note-video.jsx"
import { NoteTodos } from "../cmps/note-todos.jsx"
import { ColorInput } from "./dynamic-inputs/color-input.jsx"


export function NotePreview({ note }) {
    const [cmpType, setCmpType] = useState('color')
    const [noteStyle, setNoteStyle] = useState({ backgroundColor: 'gray', })

    function onSetNoteStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    return (
        <section>
            <article style={noteStyle}>
                {!!note.info && <h2>{note.info.title}</h2>}
                {!!note.info && <h3>{note.info.txt}</h3>}
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