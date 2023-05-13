import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onScheduleMail, onUpdateMail }) {

    let readImg = mail.isRead ? 'read' : ''
    let readEnvelope = mail.isRead ? "./assets/img/imgs-gmail/closed-envelope.svg" : "./assets/img/imgs-gmail/mark-as-read.svg"
    let starImg = mail.isStared ? "./assets/img/imgs-gmail/star-fill.svg" : "./assets/img/imgs-gmail/star.svg"
    let archiveImg = mail.isArchive ? "./assets/img/imgs-gmail/archive-fill.svg" : "./assets/img/imgs-gmail/archive-mail.svg"
    let importantImg = mail.isImportant ? "./assets/img/imgs-gmail/label-important-fill.svg" : "./assets/img/imgs-gmail/label-important.svg"

    const { subject, from, sentAt, name, id } = mail
    const mailText = mail.body ? mail.body.substring(0, 30) : ''
    return (
        <article className="mail-preview">
            <hr />
            <ul className="read clean-list flex align-center row">
                <li className="flex row">
                    <input type="checkbox" name="first-checkbox" id="" />
                    <img onClick={() => onUpdateMail(mail, 'isStared')} src={starImg} alt="" />
                    <img onClick={() => onUpdateMail(mail, 'isImportant')} src={importantImg} alt="" />
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
                    <img className="show-hovered" onClick={() => onUpdateMail(mail, 'isArchive')} src={archiveImg} alt="archive mail" />
                    <img className="show-hovered" onClick={() => onRemoveMail(mail.id)} src="./assets/img/imgs-gmail/delete-mail.svg" alt="delete mail" />
                    <img className="show-hovered" onClick={() => onUpdateMail(mail, 'isRead')} src={readEnvelope} alt="mark mail as read" />
                </li>
            </ul>
        </article >
    )
}