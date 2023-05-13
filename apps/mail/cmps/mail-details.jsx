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
                navigate('/mail')
                const updatedMails = mails.filter((mail) => mail.id !== mailId);
                setMails(updatedMails)
                showSuccessMsg(`Mail has been sent to the trash bin!`);
            })
            .catch((err) => console.error(err));
    }



    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>
    const { id, subject, body, sentAt, removeAt, name, to, from } = mail
    return (
        <section className="mail-details">
            <ul className="clean-list flex space-between">
                <li className="prev-mail flex align-center justify-center">
                    <Link to={`/mail/${previousMailId}`}><img src="./assets/img/imgs-gmail/arrow-left.svg" alt="previous mail" /></Link>
                </li>
                <li className="mail-content flex column">
                    <h3>{subject}</h3>
                    <h4>{!!name && name}</h4>
                    <p className="email-sender-details">{from ? '<' + from + '>' : ''}</p>
                    <p>{body}</p>
                </li>
                <li className="next-mail flex align-center">
                    <Link to={`/mail/${nextMailId}`}><img src="./assets/img/imgs-gmail/arrow-right.svg" alt="next mail" /></Link>
                </li>
                <li className="back-link" onClick={() => onBack()} >
                    <img src="./assets/img/imgs-gmail/arrow-back.svg" alt="delete mail" />
                </li>
                <li className="remove-link" onClick={() => onRemoveMail(mailId)} >
                    <img src="./assets/img/imgs-gmail/delete-mail.svg" alt="delete mail" />
                </li>
            </ul>
        </section>
    )
}