import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function MailSent() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({})
    let user = mailService.getUserDetails()

    useEffect(() => {
        loadMails()
    }, [filterBy])


    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }


}
