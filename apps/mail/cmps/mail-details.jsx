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

    console.log(mail)
    async function setAsRead(updatedEmail) {
        setMail((mail) => ({ ...mail, isRead: true }))
        await mailService.save(updatedEmail)
    }

    function loadBook() {
        mailService.get(mailId)
            .then(mail => {
                setMail(mail);
                return mail
            })
            .then((mail) => {
                setAsRead({ ...mail, isRead: true })
            })
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
            <ul className="clean-list flex space-between">
                {/* <li>Back
                Delete
            </li> */}
                <Link to={`/mail/${previousMailId}`} className="flex row"><img src="./assets/img/imgs-gmail/arrow-left.svg" alt="previous" /> Previous</Link>
            <li>
                <h3>{subject}</h3>
            </li>
            <li>
                <h4>{!!name && name}</h4>
            </li>
            <li>
                <p className="email-sender-details">{from ? '<' + from + '>' : ''}</p>
            </li>
            <li>
                <p>{body}</p>
            </li>
                <Link to={`/mail/${nextMailId}`} className="flex row">Next <img src="./assets/img/imgs-gmail/arrow-right.svg" alt="next" /></Link>
            </ul>
        </section>
    )
}