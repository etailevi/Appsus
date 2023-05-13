const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailTrash } from "./apps/mail/views/mail-trash.jsx"
import { MailStarred } from "./apps/mail/views/mail-stared.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { MailDraft } from "./apps/mail/views/mail-draft.jsx"
import { MailSent } from "./apps/mail/views/mail-sent.jsx"
import { MailImportant } from "./apps/mail/views/mail-important.jsx"
import { MailArchive } from "./apps/mail/views/mail-archive.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { PinnedNotes } from "./apps/note/views/note-pinned.jsx"




export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/mail/trash" element={<MailTrash />} />
                <Route path="/mail/sent" element={<MailSent />} />
                <Route path="/mail/starred-mails" element={<MailStarred />} />
                <Route path="/mail/important" element={<MailImportant />} />
                <Route path="/mail/draft" element={<MailDraft />} />
                <Route path="/mail/archive" element={<MailArchive />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/pinned" element={<PinnedNotes />} />
                {/* <Route path="/note/:noteId" element={<NoteDetails />} /> */}
            </Routes>
        </section>
    </Router>
}
