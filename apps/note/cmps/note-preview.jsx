const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteTxt } from "../cmps/note-txt.jsx"
import { NoteImg } from "../cmps/note-img.jsx"
import { NoteVideo } from "../cmps/note-video.jsx"
import { NoteTodos } from "../cmps/note-todos.jsx"
import { ColorInput } from "./dynamic-inputs/color-input.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"


export function NotePreview({ note, onRemoveNote, setNotes, setNotes }) {
    const [noteToBeEdited, setNoteToBeEdited] = useState(note)
    const [cmpType, setCmpType] = useState('color')
    const [noteStyle, setNoteStyle] = useState({ backgroundColor: 'pink', })
    const [activatedEdit, setActivatedEdit] = useState(false)


    function onSetNoteStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
        setNoteToBeEdited(prevNote => ({ ...prevNote, style: { ...newStyle } }))
        const newNote = { ...noteToBeEdited, style: { ...newStyle } }
        noteService.save(newNote)
    }

    function toggleColorPalette() {
        setColorPaletteVisible((prevVisible) => !prevVisible);
    }


    function onPinNote(noteId) {

    }

    return (
        <section style={noteToBeEdited.style} className="note-container" >
            <article className="note-card" style={{ backgroundColor: 'note.style.backgroundColor' }}>
                {!!note.info && <h1>{noteToBeEdited.info.title}</h1>}
                {!!note.info && <p>{noteToBeEdited.info.txt}</p>}
                <button className="note-pin" onClick={() => onPinNote(note.id)} ><img src="./assets/img/imgs-notes/pin.svg" alt="Pin Note" /></button>
                <ul>
                    <li className="flex row">
                        <button className="edit-note" onClick={() => setActivatedEdit(true)} ><img src="./assets/img/imgs-notes/edit.svg" alt="Edit-Note" /></button>
                        {!!activatedEdit && <NoteEdit setNoteToBeEdited={setNoteToBeEdited} note={noteToBeEdited} setActivatedEdit={setActivatedEdit} />}
                        <button className="mail-send" onClick={() => onPinNote(note.id)} ><img src="./assets/img/imgs-gmail/mail.svg" alt="Mail" /></button>
                        <button className="palette-color" onClick={() => toggleColorPalette()} ><img src="./assets/img/imgs-notes/color-palette.svg" alt="Color Palette" /></button>
                        {!!colorPaletteVisible && <DynamicCmp toggleColorPalette={toggleColorPalette} noteColor={noteColor} onSetNoteStyle={onSetNoteStyle} />}
                        <button className="note-trash" onClick={(ev) => onRemoveNote(note.id)} ><img src="./assets/img/imgs-notes/trash.svg" alt="Trash" /></button>
                    </li>
                </ul>

            </article>
            {/* <NoteTxt />
            <NoteImg />
            <NoteVideo />
            <NoteTodos /> */}
        </section >
    )
}

function DynamicCmp(props) {
    switch (props.noteColor) {
        case 'color':
            return <ColorInput {...props} />
        case 'fontSize':
            return <FontsizeInput {...props} />
    }
}
