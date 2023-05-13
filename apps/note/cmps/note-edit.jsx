import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


const { useEffect, useState } = React

const { useParams, useNavigate } = ReactRouterDOM

export function NoteEdit({ setActivatedEdit, note, setNoteToBeEdited }) {
    // const [note, setNoteToEdit] = useState(note)
    const [colorPaletteVisible, setColorPaletteVisible] = useState(false)
    const [noteStyle, setNoteStyle] = useState(note && note.style)

    function onSetNoteStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
        setNoteToAdd(prevNote => ({ ...prevNote, ...noteStyle }))
    }

    function toggleColorPalette() {
        setColorPaletteVisible((prevVisible) => !prevVisible);
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNoteToBeEdited(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onSaveEditedNote(ev) {
        ev.preventDefault()
        console.log('entered onsaveeditednote')
        noteService.save(note).then(() => {
            showSuccessMsg('Note has been successfully edited')
            setActivatedEdit(false)
            setNoteToBeEdited(note)
        })
    }

    if (!note) return null
    const { info } = note
    return (
        <section className="note-edit">
            <ul className="note-add-input clean-list">
                <form onSubmit={onSaveEditedNote}>
                    <li className="input-title flex column">
                        <label htmlFor="title"></label>
                        <input value={info.title} onChange={handleChange} name="title" id="title" type="text" />
                        <textarea value={info.txt} onChange={handleChange} name="txt" id="text" type="text" rows="3"></textarea>
                    </li>
                    <li className="input-btns flex row align-center justify-center space-between">
                        {/* <button type="button"><img onClick={() => toggleColorPalette()} src="./assets/img/imgs-notes/color-palette.svg" alt="" /> */}
                        {/* {!!colorPaletteVisible && <DynamicCmp noteColor={noteColor} onSetNoteStyle={onSetNoteStyle} />}</button> */}
                        <button type="button"><img src="./assets/img/imgs-notes/input-image.svg" alt="" /></button>
                        <button type="button"><img src="./assets/img/imgs-notes/archive.svg" alt="" /></button>
                        <button type="button"><img onClick={() => onDeleteText()} src="./assets/img/imgs-notes/back.svg" alt="" /></button>
                        <button>Close</button>
                    </li>
                </form>
            </ul>
        </section>
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
