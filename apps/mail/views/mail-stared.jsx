import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function MailStarred() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({ isStared: true, isRemoved: false })

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onRemoveMail(mailId) {
        mailService.get(mailId)
            .then((mail) => {
                mail.isRemoved = true
                return mailService.save(mail)
            })
            .then(() => {
                const updatedMails = mails.filter((mail) => mail.id !== mailId);
                setMails(updatedMails)
                showSuccessMsg(`Mail has been starred!`);
            })
            .catch((err) => console.error(err))
    }

    if (mails.length === 0) return <div>There are no starred mails</div>
    return (
        <section>
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
        </section>
    )
}



