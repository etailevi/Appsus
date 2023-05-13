const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter, filterBy }) {
    const [filterToEdit, setFilterBy] = useState(mailService.getDefaultFilter())
    // const [sortByToEdit, setSortByToEdit] = useState(sortBy)


    useEffect(() => {
        onSetFilter(filterToEdit)
    }, [filterToEdit])



    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterToEdit)
    }

    function onFilterChange(ev) {
        const value = ev.target.value
        setFilterBy((prevFilter) => ({ ...prevFilter, subject: value }))
    }


    const { subject } = filterBy;

    return (
        <form className="mail-filter" onSubmit={onSubmitFilter}>
            <input onChange={onFilterChange} type="search" name="search" id="" label="Search" value={subject} placeholder="Search" />
            <button className="btn-search" id="search"><img src="./assets/img/imgs-gmail/search.svg" alt="" /></button>
        </form>
    )
}