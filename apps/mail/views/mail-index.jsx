const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx";
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isComposeOpen, setIsComposeOpen] = useState(false);


    useEffect(() => {
        loadMails()
    }, [filterBy, isComposeOpen])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onArchiveMail(mail) {
        mail.isArchive = true
        mailService.save(mail).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg(`Mail archived!`)
        })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg(`Mail has been removed!`)
        })
    }


    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function toggleCompose() {
        setIsComposeOpen(prevIsComposeOpen => !prevIsComposeOpen);
    }

    function onMailSent() {
        setIsComposeOpen(false);
        loadMails()
    }

    return (
        <section>
            {/* <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            {!isComposeOpen && <button onClick={toggleCompose}>Compose</button>}
            {isComposeOpen && <MailCompose onMailSent={onMailSent} />}
        </section>
    )
}

