export function NoteImg({ note }) {
    return (
        <section className="note-img">
            <h1>{note.info.title}</h1>
            <img src={note.info.url} />
        </section>
    )
}