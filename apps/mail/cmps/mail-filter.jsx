const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter, filterBy }) {
    const [filterToEdit, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterToEdit)
    }, [filterToEdit])


    // function cleanForm() {
    //     setFilterBy({subject: '', body: '', name: '', to: '', from: ''})
    // }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterToEdit)
    }

    function onFilterChange(ev) {
        const value = ev.target.value
        console.log(value)
        setFilterBy((prevFilter) => ({ ...prevFilter, subject: value, body: value, name: value, to: value, from: value }))
    }


    const { body } = filterBy;

    return (
        <form className="mail-filter" onSubmit={onSubmitFilter}>
            <input onChange={onFilterChange} type="search" name="search" id="" label="Search" value={body} placeholder="Search" />
            <button className="btn-search" id="search"><img src="./assets/img/imgs-gmail/search.svg" alt="" /></button>
        </form>
    )
}