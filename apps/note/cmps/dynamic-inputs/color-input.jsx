
export function ColorInput({ onSetNoteStyle, toggleColorPalette }) {
    const colors = ['#FFD1D1', '#FBFFDE', '#D7FDDF', '#E0FFFD', '#D0D0FE', '#F9DEFF', 'lightgray', 'white']


    function onChooseColor(color) {
        const newStyle = { backgroundColor: color }
        toggleColorPalette()
        onSetNoteStyle(newStyle)
    }

    return (
        <section className="color-input-container">
            {
                colors.map(color => <div
                    className="color-input"
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => onChooseColor(color)}
                ></div>)
            }
        </section>
    )
}