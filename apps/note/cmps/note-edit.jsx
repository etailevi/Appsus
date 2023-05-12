import { showSuccessMsg } from "../../../services/event-bus.service"
import { noteService } from "../services/note.service.js"

const { useEffect, useState } = React

const { useParams, useNavigate } = ReactRouterDOM

export function NoteEdit(setActivatedEdit) {
    const [noteToEdit, setNoteToEdit] = useState()
    const params = useParams()

    useEffect(() => {
        if (params.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(params.noteId).then(setNoteToEdit).catch(err => {
            showErrorMsg('Note has not been found')
        })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNoteToEdit(note => ({ ...note, [field]: value }))
    }

    function onSaveEditedNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit).then(() => {
            showSuccessMsg('Note has been successfully edited')
            setActivatedEdit(false)
        })
    }

    if (!noteToEdit) return
    const { txt, title } = noteToEdit.info ? { ...noteToEdit.info } : {}
    return (
        <section className="note-edit">
            <ul className="note-add-input clean-list">
                <form onSubmit={onSaveEditedNote}>
                    <li className="input-title flex column">
                        <label htmlFor="title"></label>
                        <input value={title} onChange={handleChange} name="title" id="title" type="text" />
                        <textarea value={txt} onChange={handleChange} name="txt" id="text" type="text" rows="3"></textarea>
                    </li>
                    <li className="input-btns flex row align-center justify-center space-between">
                        <button type="button"><img onClick={() => toggleColorPalette()} src="./assets/img/imgs-notes/color-palette.svg" alt="" />
                            {!!colorPaletteVisible && <DynamicCmp noteColor={noteColor} onSetNoteStyle={noteColor} />}</button>
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