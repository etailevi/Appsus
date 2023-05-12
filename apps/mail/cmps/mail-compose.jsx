import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React

export function MailCompose({ onMailSent, setIsComposeOpen }) {

    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const [isOn, setIsOn] = useState(true)

    useEffect(() => {
        setIsOn(true)
    }, [])

    async function clicked() {
        setIsComposeOpen(false)
        if (body.length > 0 || subject.length > 0) {
            const newMail = { ...mailToAdd, isDraft: true }
            await mailService.save(newMail)
            showSuccessMsg('Mail has been added to drafts')
            console.log(newMail)
        }
        setIsOn(false)
    }

    const loggedInUserDetails = mailService.getUserDetails()

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setMailToAdd(mail => ({ ...mail, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        setMailToAdd(mail => ({ ...mail, sentAt: Date.now(), from: loggedInUserDetails.email }))
        mailService.save(mailToAdd).then(() => {
            showSuccessMsg('Mail has been successfully sent')
            onMailSent()
        })
    }

    const { from, to, subject, body } = mailToAdd

    return (
        !!isOn && <section className="mail-compose flex column">
            <ul className="clean-list">
                <li className="compose-header flex row space-between align-center">
                    <h4>New Message</h4>
                    <button className="close-compose" onClick={() => clicked()}><i className="fa-solid fa-x"></i></button>
                </li>
                <li className="flex row">
                    <form onSubmit={onSaveMail}>
                        {/* <h5 className="mail-compose-msg"></h5> */}
                        {/* <input required onChange={handleChange} value={from} type="email" name="from" id="" placeholder="Your-Mail" /> */}
                        <input required onChange={handleChange} value={to} type="email" name="to" id="" placeholder="To" />
                        <input required onChange={handleChange} value={subject} type="text" name="subject" id="" placeholder="Subject" />
                        <textarea value={body} onChange={handleChange} name="body" id="" cols="30" rows="10"></textarea>
                        <button className="btn-send-mail flex align-center justify-center space-between">Send<i className="fa-regular fa-paper-plane"></i></button>

                    </form>
                </li>
            </ul>
        </section>
    )
}