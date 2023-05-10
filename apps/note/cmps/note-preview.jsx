const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteTxt } from "../cmps/note-txt.jsx"
import { NoteImg } from "../cmps/note-img.jsx"
import { NoteVideo } from "../cmps/note-video.jsx"
import { NoteTodos } from "../cmps/note-todos.jsx"
import { ColorInput } from "./dynamic-inputs/colot-input.jsx"


export function NotePreview({ note }) {
    const [cmpType, setCmpType] = useState('color')
    const [noteStyle, setNoteStyle] = useState({
        backgroundColor: 'gray',
        fontSize: '16px'
    })

    function onSetNoteStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }


    // const {}
    return (
        <section>
            <article style={noteStyle}>
                <h2>{note.info.title}</h2>
                <h3>{note.info.txt}</h3>
            </article>
            <NoteTxt />
            <NoteImg />
            <NoteVideo />
            <NoteTodos />
            <DynamicCmp cmpType={cmpType} name="Muki" onSetFooterStyle={onSetFooterStyle} />
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'color':
            return <ColorInput {...props} />
        case 'fontSize':
            return <FontsizeInput {...props} />
    }
}