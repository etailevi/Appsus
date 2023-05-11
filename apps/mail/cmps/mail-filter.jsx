const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter, filterBy }) {
    const [filterToEdit, setFilterBy] = useState(mailService.getFilterBy())

    return (
        <form className="mail-filter" onSubmit={onSubmitFilter}>
            <input type="search" name="" id="" label="Search" />
        </form>
    )
}