function AbilityRow({ ability, abilityValue }) {
    return (
        <div className="abilityRow">
            <span className="abilityName">{ability}:</span>
            <div className="abilitySlider">
                <div className="sliderValue" style={{ width: abilityValue + '%' }}>
                    <span>{abilityValue}</span>
                </div>
            </div>
        </div>
    )
}

export default AbilityRow;