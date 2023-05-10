const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail }) {
    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <section>
                        <button><Link to={`/mail/${mail.id}`} >Details</Link ></button>
                        <button onClick={() => onRemoveMail(mail.id)} >Remove Mail</button>
                    </section>
                </li>
            )}
        </ul>
    )
}