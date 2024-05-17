import React from "react";
import style from "./Inputs.module.css";

function RadioInput({ value, checked, action }) {
    return (
        <div className={style["selected-radio"]}>
            <input className={style["input-radio"]}
                type="radio"
                value={value}
                checked={checked}
                onChange={action}
            />

            <label htmlFor={value}>
                {value}
            </label>
        </div>
    );
}

export default RadioInput;