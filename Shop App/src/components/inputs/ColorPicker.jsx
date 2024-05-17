import React from "react";
import style from "./Inputs.module.css";

function ColorPicker({ value, action }) {
    return (
        <input
            className={style["color-picker"]}
            type="color"
            name="boja"
            value={value}
            onChange={action}
            required
        />

    );
}

export default ColorPicker;