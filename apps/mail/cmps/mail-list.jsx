const { Link } = ReactRouterDOM
const { useEffect, useState } = React
import { mailService } from "../services/mail.service.js"

import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail, onRemoveMailFinal, onUpdateMail, source }) {

    return (
        <section className="mail-list">
            <ul className="clean-list">
                {mails.map(mail =>
                    <li key={mail.id}>
                        <MailPreview mail={mail} onUpdateMail={onUpdateMail} onRemoveMail={source === 'trash' ? onRemoveMailFinal : onRemoveMail} />
                        <section>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}