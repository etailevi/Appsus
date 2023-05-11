const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail }) {
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
                        <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                        <section>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}