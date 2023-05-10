const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteTxt } from "../cmps/note-txt.jsx"
import { NoteImg } from "../cmps/note-img.jsx"
import { NoteVideo } from "../cmps/note-video.jsx"
import { NoteTodos } from "../cmps/note-todos.jsx"


export function NotePreview() {
    



    return (
        <section>
            <NoteTxt />
            <NoteImg />
            <NoteVideo />
            <NoteTodos />
        </section>
    )
}