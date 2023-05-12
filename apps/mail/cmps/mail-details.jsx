const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"


export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)
    const [previousMailId, setPreviousMailId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadBook()
        loadNextBookId()
        loadPreviousBookId()
    }, [mailId])

    function loadBook() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issued in mail details:', err);
                navigate('/mail')
                showErrorMsg('Mail not found!')
            })
    }

    function loadNextBookId() {
        mailService.getNextMailId(mailId).then(setNextMailId)
    }

    function loadPreviousBookId() {
        mailService.getPreviousMailId(mailId).then(setPreviousMailId)
    }

    function onBack() {
        navigate('/mail')
    }
    if (!mail) return <div>Loading...</div>
    const { id, subject, body, sentAt, removeAt, name, to, from } = mail
    return (
        <section className="mail-details">
            <ul className="clean-list flex space-between"><li><h3>{subject}</h3></li>
                {/* <li>Back
                Delete
            </li> */}
                <h4>{!!name && name}</h4><p className="email-sender-details">{from ? '<' + from + '>' : ''}</p>
                <p>{body}</p>
                <Link to={`/mail/${previousMailId}`}>Previous (איתי שם פה חץ)</Link>
                <Link to={`/mail/${nextMailId}`}>Next (איתי שם פה חץ)</Link>
            </ul>
        </section>
    )
}