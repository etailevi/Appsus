const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail, onRemoveMailFinal, onStarMail, onImportantMail }) {

    function onMarkRead(mail) {
        mail.isRead = true
        mailService.save(mail).then(setMails)
    }

    function onScheduleMail(mail) {
        mail.isSchedule = true
        mailService.save(mail).then(setMails)
    }


    return (
        <section className="mail-list">
            <ul className="clean-list">
                {mails.map(mail =>
                    <li key={mail.id}>
                        <MailPreview mail={mail} onImportantMail={onImportantMail} onStarMail={onStarMail} onRemoveMail={mail.isRemoved ? onRemoveMailFinal : onRemoveMail} />
                        <section>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}