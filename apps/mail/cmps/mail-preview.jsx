import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {

    const { subject, from, sentAt, name, id } = mail
    const mailText = mail.body.substring(0, 30)
    return (
        <article className="mail-preview flex space-between">
            <ul className="clean-list flex space-between row">
                <li>
                    <input type="checkbox" name="first-checkbox" id="" />
                    <img src="../../../assets/img/imgs-gmail/star.svg" alt="" />
                    <img src="../../../assets/img/imgs-gmail/label-important.svg" alt="" />
                </li>
                <li className="mail-preview-content">
                    <Link to={`/mail/${id}`} className="flex row">
                        <h3 className="mail-sender-name">{name}</h3>
                        <h3>{subject}</h3>
                        <h5>{mailText}</h5>
                    </Link>
                </li>
                <li className="flex row">
                    <h3>{utilService.intToFormat(sentAt)}</h3>
                    {/* Add that buttons will be shown only once mail is hovered */}
                    <img src="../../../assets/img/imgs-gmail/archive-mail.svg" alt="" />
                    <img onClick={() => onRemoveMail(mail.id)} src="../../../assets/img/imgs-gmail/delete-mail.svg" alt="" />
                    <img src="../../../assets/img/imgs-gmail/mark-as-read.svg" alt="" />
                    <img src="../../../assets/img/imgs-gmail/schedule.svg" alt="" />
                </li>
            </ul>
        </article >
    )
}