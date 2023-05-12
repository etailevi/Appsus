const { Link } = ReactRouterDOM
const { useEffect, useState } = React
import { mailService } from "../services/mail.service.js"

import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail, onRemoveMailFinal, onStarMail, onImportantMail }) {

    useEffect(() => {

    }, [onMarkRead])

    function onMarkRead(mail) {
        mail.isRead = true
        mailService.save(mail)
    }

    // function onScheduleMail(mail) {
    //     mail.isSchedule = true
    //     mailService.save(mail).then(setMails)
    // }


    return (
        <section className="mail-list">
            <ul className="clean-list">
                {mails.map(mail =>
                    <li key={mail.id}>
                        <MailPreview mail={mail} onMarkRead={onMarkRead} onImportantMail={onImportantMail} onStarMail={onStarMail} onRemoveMail={mail.isRemoved ? onRemoveMailFinal : onRemoveMail} />
                        <section>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}