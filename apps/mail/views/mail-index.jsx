const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg(`Mail removed!`)
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }


    return (
        <section>
            {/* <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            <h5>dddd</h5>
        </section>
    )
}

