import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {

    const { subject, from, sentAt, name } = mail
    const mailText = mail.body.substring(0, 20)
    return (
        <article className="mail-preview">
            <input type="checkbox" name="first-checkbox" id="" />
            <input type="checkbox" name="" id="" /><img src="../../../assets/img/imgs-gmail/star.svg" alt="" />
            <input type="checkbox" name="" id="" /><img src="../../../assets/img/imgs-gmail/label-important.svg" alt="" />
            <h3>{name}</h3>
            <h3>{subject}</h3>
            <h5>{mailText}</h5>
            <h3>{utilService.intToFormat(sentAt)}</h3>
            {/* Add that buttons will be shown only once mail is hovered */}
            <button ><img src="../../../assets/img/imgs-gmail/archive-mail.svg" alt="" /></button>
            <input type="checkbox" name="" id="" /><img src="../../../assets/img/imgs-gmail/delete-mail.svg" alt="" />
            <input type="checkbox" name="" id="" /><img src="../../../assets/img/imgs-gmail/mark-as-read.svg" alt="" />
            <input type="checkbox" name="" id="" /><img src="../../../assets/img/imgs-gmail/schedule.svg" alt="" />
        </article>
    )
}