
export function ColorInput({ onSetNoteStyle, toggleColorPalette }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']


    function onChooseColor(color) {
        const newStyle = { backgroundColor: color }
        toggleColorPalette()
        onSetNoteStyle(newStyle)
    }

    return <section className="color-input-container">
        {
            colors.map(color => <div
                className="color-input"
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => onChooseColor(color)}
            ></div>)
        }
    </section>
}