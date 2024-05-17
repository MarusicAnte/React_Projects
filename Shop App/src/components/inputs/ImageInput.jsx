import React from "react";
import style from "./Inputs.module.css";

function ImageInput({ name, value, action, array, info }) {
    return (
        <select
            className={style["selected"]}
            name={name}
            value={value}
            onChange={action}
            required
        >
            <option>Odaberi</option>
            {array.map((i) => (
                <option key={i.id} value={i.putanja}>
                    {i.name}
                </option>
            ))}
        </select>
    );
}

export default ImageInput;