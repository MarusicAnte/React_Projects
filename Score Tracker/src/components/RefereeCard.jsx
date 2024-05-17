import { useEffect, useState } from "react";

function RefereeCard({ imgURL, alt, disabled, isReset, defaultValue }) {
    const [value, setValue] = useState(0);

    const buttonClass = disabled ? 'disabledBtn' : '';

    const incrementValue = () => {
        setValue((prev) => prev + 1);
    }

    const decrementValue = () => {
        (value <= 0 ? setValue(0) : setValue((prev) => prev - 1));
    }

    useEffect(() => {
        setValue(0);
    }, [isReset])

    return (
        <>
            <div>
                <img src={imgURL} alt={alt} className="refereeCard" />
                <span>{value + defaultValue}</span>
                <button disabled={disabled} className={buttonClass} onClick={incrementValue}>+</button>
                <button disabled={disabled} className={buttonClass} onClick={decrementValue}>-</button>
            </div>
        </>
    );
}

export default RefereeCard;