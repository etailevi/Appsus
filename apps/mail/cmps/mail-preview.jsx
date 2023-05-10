import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    const { subject, from, sentAt, name } = mail
    const mailText = mail.body.substring(0, 30)
    return (
        <article className="mail-preview flex space-between">
            <input type="checkbox" name="first-checkbox" id="" />
            <img src="../../../assets/img/imgs-gmail/star.svg" alt="" />
            <img src="../../../assets/img/imgs-gmail/label-important.svg" alt="" />
            <div className="mail-preview-content">
                <Link to={`/mail/${id}`}>
                    <h3>{name}</h3>
                    <h3>{subject}</h3>
                    <h5>{mailText}</h5>
                </Link>
            </div>
            <h3>{utilService.intToFormat(sentAt)}</h3>
            {/* Add that buttons will be shown only once mail is hovered */}
            <button ><img src="../../../assets/img/imgs-gmail/archive-mail.svg" alt="" /></button>
            <img onClick={() => onRemoveMail(mail.id)} src="../../../assets/img/imgs-gmail/delete-mail.svg" alt="" />
            <img src="../../../assets/img/imgs-gmail/mark-as-read.svg" alt="" />
            <img src="../../../assets/img/imgs-gmail/schedule.svg" alt="" />
        </article>
    )
}