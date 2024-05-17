import style from "./Input.module.css"

function Input({ value, action }) {
    return (
        <div className={style["inputWrapper"]}>
            <label htmlFor="numberInput" className={style["inputLabel"]}>Number of questions :</label>
            <input type="number" id="numberInput" min={1} max={10}
                value={value} onChange={action} className={style["inputElement"]} />
        </div>
    );
}

export default Input;