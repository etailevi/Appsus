

export function NoteAdd() {


    function handleChange() {

    }

    function onAddNote() {

    }



    return (
        <form onSubmit={onAddNote}>
            <label htmlFor="title"></label>
            <input value="" onChange={handleChange} name="title" id="title" type="text" placeholder="Enter your text here" />
            <button>Add Note</button>
        </form>
    )
}