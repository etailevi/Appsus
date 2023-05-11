import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React


export function MailCompose() {

    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const [isOn, setIsOn] = useState(true)

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setMailToAdd(mail => ({ ...mail, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(mailToAdd).then(() => {
            setIsOn(false)
            showSuccessMsg('Mail has been successfully sent')
        })
    }

    const { from, to, subject, body } = mailToAdd

    return (
        isOn && <section className="mail-compose">
            <h4>New Message</h4>
            <form onSubmit={onSaveMail}><h5 className="mail-compose-msg">From</h5><input required onChange={handleChange} value={from} type="text" name="name" id="" placeholder="Your-Mail" />
                <input required onChange={handleChange} value={to} type="text" name="to" id="" placeholder="To" />
                <input required onChange={handleChange} value={subject} type="text" name="" id="" placeholder="Subject" />
                <textarea value={body} onChange={handleChange} name="" id="" cols="30" rows="10"></textarea>
                <button>Send</button>
            </form>
        </section>
    )
}