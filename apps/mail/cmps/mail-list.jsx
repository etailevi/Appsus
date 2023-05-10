const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail }) {
    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                    <section>
                    </section>
                </li>
            )}
        </ul>
    )
}