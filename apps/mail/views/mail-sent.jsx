import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function MailSent() {

    const [mails, setMails] = useState([])
    let user = mailService.getUserDetails()
    const [filterBy, setFilterBy] = useState({ from: user.email, isRemoved: false })
    console.log(filterBy)
    useEffect(() => {
        loadMails()
    }, [filterBy])

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
                const updatedMails = mails.filter((mail) => mail.id !== mailId)
                setMails(updatedMails)
                showSuccessMsg(`Mail has been starred!`)
            })
            .catch((err) => console.error(err))
    }


    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    if (mails.length === 0) return <div>There are no sent mails</div>

    return (
        <section>
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
        </section>
    )

}






