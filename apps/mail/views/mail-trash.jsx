import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function MailTrash() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({ isRemoved: true })

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }


    function onRemoveMailFinal(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg(`Mail has been successfully removed from recycle bin`)
        })
    }

    if (mails.length === 0) return <div>The trash bin is empty</div>
    return (
        <section>
            <MailList mails={mails} source="trash" onRemoveMailFinal={onRemoveMailFinal} />
        </section>
    )
}



