import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {

    const { title, listPrice: { amount, currencyCode }, thumbnail } = mail
    return (
        <article className="mail-preview">
            <h2>Mail Title: {title}</h2>
            <img src={thumbnail ? `${thumbnail}` : `../assets/img/default-book.png`} alt="" />
        </article>
    )
}