const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteTxt } from "../cmps/note-txt.jsx"
import { NoteImg } from "../cmps/note-img.jsx"
import { NoteVideo } from "../cmps/note-video.jsx"
import { NoteTodos } from "../cmps/note-todos.jsx"


export function NotePreview() {

    // const [cmpType, setCmpType] = useState('color')
    // const [footerStyle, setFooterStyle] = useState({ backgroundColor: 'gray' })

    // function onSetFooterStyle(newStyle) {
    //     setFooterStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    // }

    // function DynamicCmp(props) {
    //     switch (props.cmpType) {
    //         case 'color':
    //             return <ColorInput {...props} />
    //         // case 'fontSize':
    //         //     return <FontsizeInput {...props} />
    //     }
    // }


    return (
        <section>
            <NoteTxt />
            <NoteImg />
            <NoteVideo />
            <NoteTodos />
        </section>
    )
}