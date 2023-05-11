const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
import { ColorInput } from "./dynamic-inputs/color-input.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export function NoteAdd() {
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [placeholder, setPlaceholder] = useState("Enter your note here..");
    const [cmpType, setCmpType] = useState('color')
    const [colorPaletteVisible, setColorPaletteVisible] = useState(false)
    const [noteStyle, setNoteStyle] = useState({
        backgroundColor: 'white',
    })

    function onSetNoteStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    useEffect(() => {
        // Your effect code here
    }, [noteToAdd]);

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        if (field === 'title' || field === 'txt') {
            setNoteToAdd(note => ({ ...note, info: { ...note.info, [field]: value } }))
        } else {
            setNoteToAdd(note => ({ ...note, [field]: value }))
        }
    }

    function onAddNote(ev) {
        ev.preventDefault()
        noteService.save(noteToAdd).then(() => showSuccessMsg(`Added new note`))
    }

    function onDeleteText() {
        setNoteToAdd(note => ({ ...note, info: { ...note.info, txt: '' } }))
        setPlaceholder("Enter your note here..")
    }

    function toggleColorPalette() {
        setColorPaletteVisible((prevVisible) => !prevVisible);
    }

    function onColorSelect(color) { }

    const { title, txt } = noteToAdd
    return (
        <ul className="note-add-input clean-list">
        <form onSubmit={onAddNote} >
            <li className="input-title flex column">
            <label htmlFor="title"></label>
            <input value={title} onChange={handleChange} name="title" id="title" type="text" placeholder="Title" />
            <input required value={txt} onChange={handleChange} name="txt" id="text" type="text" placeholder={placeholder} />
            </li>
            <li className="input-btns flex row">
            <img onClick={() => toggleColorPalette()} src="./assets/img/imgs-notes/color-palette.svg" alt="" />
            {!!colorPaletteVisible && <ColorPalette onSetNoteStyle={onSetNoteStyle} />}
            <img src="./assets/img/imgs-notes/input-image.svg" alt="" />
            <img src="./assets/img/imgs-notes/archive.svg" alt="" />
            <img onClick={() => onDeleteText()} src="./assets/img/imgs-notes/back.svg" alt="" />
            <button><img src="./assets/img/imgs-notes/bookmark.svg" alt="" /></button>
            </li>
        </form>
        </ul>
    )
}
