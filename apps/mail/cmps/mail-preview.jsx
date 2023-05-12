import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onArchiveMail, onScheduleMail, onStarMail, onImportantMail, onMarkRead }) {

    let isRead = mail.isRead ? 'read' : ''
    let readEnvelope = mail.isRead ? "./assets/img/imgs-gmail/closed-envelope.svg" : "./assets/img/imgs-gmail/mark-as-read.svg"

    const { subject, from, sentAt, name, id } = mail
    const mailText = mail.body ? mail.body.substring(0, 30) : ''
    console.log('mail from preview', mail)
    return (
        <article className="mail-preview">
            <hr />
            <ul className="clean-list flex align-center row">
                <li className="flex row">
                    <input type="checkbox" name="first-checkbox" id="" />
                    <img onClick={() => onStarMail(mail)} src="./assets/img/imgs-gmail/star.svg" alt="" />
                    <img onClick={() => onImportantMail(mail)} src="./assets/img/imgs-gmail/label-important.svg" alt="" />
                </li>
                <li className="mail-preview-content">
                    <Link to={`/mail/${id}`} className="flex row align-center">
                        <h3 className="mail-sender-name">{name}</h3>
                        <h4 className="mail-subject">{subject}</h4>
                        <h5>{mailText}</h5>
                    </Link>
                </li>
                <li className="mail-opts flex row">
                    <h3 className="date-recieved">{utilService.intToFormat(sentAt)}</h3>
                    {/* Add that buttons will be shown only once mail is hovered */}
                    <img className="show-hovered" onClick={() => onArchiveMail(mail)} src="./assets/img/imgs-gmail/archive-mail.svg" alt="archive mail" />
                    <img className="show-hovered" onClick={() => onRemoveMail(mail.id)} src="./assets/img/imgs-gmail/delete-mail.svg" alt="delete mail" />
                    <img className="show-hovered" onClick={() => onMarkRead(mail)} src={readEnvelope} alt="mark mail as read" />
                    <img className="show-hovered" onClick={() => onScheduleMail(mail)} src="./assets/img/imgs-gmail/schedule.svg" alt="schedule mail" />
                </li>
            </ul>
        </article >
    )
}