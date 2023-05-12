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
    function onStarMail(mail) {
        mail.isStared = true
        mailService.save(mail).then(loadMails)
    }

    function onMarkRead(mail) {
        mail.isRead = true
        mailService.save(mail)
    }

    function onImportantMail(mail) {
        mail.isImportant = true
        mailService.save(mail).then(loadMails)
    }
    function onRemoveMail(mailId) {
        mailService.get(mailId)
            .then((mail) => {
                mail.isRemoved = true;
                return mail
            })
            .then((mail) => {
                return mailService.save(mail)
            })
            .then(() => {
                const updatedMails = mails.filter((mail) => mail.id !== mailId);
                setMails(updatedMails)
                showSuccessMsg(`Mail has been sent to the trash bin!`);
            })
            .catch((err) => console.error(err));
    }


    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function toggleCompose() {
        setIsComposeOpen(prevIsComposeOpen => !prevIsComposeOpen);
    }

    function onMailSent() {
        setIsComposeOpen(!isComposeOpen);
        loadMails()
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section>
            <button><Link to={`/mail/trash`} >Trash</Link ></button>
            <button><Link to={`/mail/starred-mails`} >Starred</Link ></button>
            <button><Link to={`/mail/important`} >Important</Link ></button>
            {/* <button><Link to={`/mail/sent`} >Sent</Link ></button> */}
            <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <MailList mails={mails} onMarkRead={onMarkRead} onRemoveMail={onRemoveMail} onStarMail={onStarMail} onImportantMail={onImportantMail} />
            {!isComposeOpen && <button onClick={toggleCompose} className="btn-compose flex align-center justify-center space-between">
            <i class="fa-solid fa-pencil"></i>
                Compose
            </button>}
            {isComposeOpen && <MailCompose onMailSent={onMailSent} />}
        </section>
    )
}

