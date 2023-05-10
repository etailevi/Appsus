
import { NotePreview } from "../cmps/note-preview.jsx"

export function NoteIndex() {


    return (
        <section>
            <form onSubmit={onAddNote}>
                <label htmlFor="title"></label>
                <input value={title} onChange={handleChange} name="title" id="title" type="text" placeholder="" />

                <label htmlFor="maxPrice">Max Price:</label>
                <input value={maxPrice} onChange={handleChange} type="number" name="maxPrice" id="maxPrice" placeholder="By Max Price" />

                <button>Add Note</button>
            </form>


            <NotePreview />
        </section>
    )
}

