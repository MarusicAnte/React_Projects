import style from "./Input.module.css"

function Select({ label, name, id, optionValues, action }) {
    return (
        <div className={style["inputWrapper"]}>
            <label htmlFor={name} className={style["inputLabel"]}>{label} :</label>
            <select name={name} id={id} className={style["selectElement"]} onChange={action}>
                {optionValues.map((value, index) => (
                    <option key={index} value={value.id} className={style["option"]}>{value.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;