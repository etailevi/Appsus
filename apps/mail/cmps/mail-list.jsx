const { Link } = ReactRouterDOM


import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail }) {
    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    {/* <MailPreview mail={mail} /> */}
                    <section>
                        <button onClick={() => onRemoveMail(mail.id)} >Remove Mail</button>
                        <div>{JSON.stringify({ mail })}</div>
                        <button><Link to={`/mail/${mail.id}`} >Details</Link ></button>
                        <button><Link to={`/mail/edit/${mail.id}`} >Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}