import { utilService } from "../../../services/util.service.js";

export function NoteTxt({ note }) {
    const txt = utilService.capitalFirstLetter(note.info.txt)
    return (
        <section>
            <h1>{note.info.title}</h1>
            <p>{txt}</p>
        </section>
    )
}