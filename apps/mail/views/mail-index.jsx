const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx";
import { MailDetails } from "../cmps/mail-details.jsx";
import { MailDraft } from "./apps/mail/views/mail-draft.jsx"
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

    function onUpdateMail(mail, filter) {
        const keys = ['isRead', 'isStared', 'isImportant', 'isArchive'];

        for (const key of keys) {
            if (filter === key) {
                mail[key] = !mail[key];
                break;
            }
        }
        mailService.save(mail).then(loadMails)
    }

    function onRemoveMail(mailId) {
        mailService.get(mailId)
            .then((mail) => {
                mail.isRemoved = true
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
        setIsComposeOpen(false);
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <ul className="clean-list flex row">
                <li className="filter-btns flex column align-center">
                    <button><Link to={`/mail/starred-mails`} ><img src="./assets/img/imgs-gmail/star-fill.svg" alt="Starred mails" />Starred</Link ></button>
                    <button><Link to={`/mail/important`} ><img src="./assets/img/imgs-gmail/label-important-fill.svg" alt="Important mails" />Important</Link ></button>
                    <button><Link to={`/mail/archive`} ><img src="./assets/img/imgs-gmail/archive-mail.svg" alt="Archive mails" />Archive</Link ></button>
                    <button><Link to={`/mail/sent`} ><img src="./assets/img/imgs-gmail/sent.svg" alt="Sent mails" />Sent</Link ></button>
                    <button><Link to={`/mail/draft`} ><img src="./assets/img/imgs-gmail/draft.svg" alt="Drafts" />Draft</Link ></button>
                    <button><Link to={`/mail/trash`} ><img src="./assets/img/imgs-gmail/delete-mail.svg" alt="Deleted mail" />Trash</Link ></button>
                </li>
                <li>
                    <MailList mails={mails} onRemoveMail={onRemoveMail} onUpdateMail={onUpdateMail} />
                </li>
            </ul>
            {!isComposeOpen && <button onClick={toggleCompose} className="btn-compose flex align-center justify-center space-between">
                <i className="fa-solid fa-pencil"></i>
                Compose
            </button>}
            {isComposeOpen && <MailCompose setIsComposeOpen={setIsComposeOpen} onMailSent={onMailSent} />}
        </section>
    )
}

