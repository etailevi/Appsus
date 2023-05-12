const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"


export function MailDetails(mail) {

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issued in mail details:', err);
                navigate('/mail')
            })
    }

    function loadNextBookId() {
        mailService.getNextMailId(mailId).then(setNextMailId)
    }

    function loadPreviousBookId() {
        mailService.getPreviousMailId(mailId).then(setPreviousMailId)
    }

    const { id, subject, body, sentAt, removeAt, name, to } = mail
    let from = '<' + mail.from + '>'
    return (
        <section className="mail-details">
            <ul className="clean-list flex space-between"><li><h3>{subject}</h3></li>
                {/* <li>Back
                Save as a Note
                Delete
            </li> */}
                <h4>{!!name && name}</h4><p className="email-sender-details">{from}</p>
                <p>{body}</p>
            </ul>
        </section>
    )
}