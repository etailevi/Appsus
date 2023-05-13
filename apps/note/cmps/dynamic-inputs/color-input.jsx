
export function ColorInput({ onSetNoteStyle }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']


    console.log('entered here')
    function onChooseColor(color) {
        const newStyle = { backgroundColor: color }
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