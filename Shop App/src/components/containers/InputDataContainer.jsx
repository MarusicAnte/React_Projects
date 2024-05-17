import React from "react";
import style from "./Containers.module.css";
import ColorPicker from "../inputs/ColorPicker";

function InputDataContainer({ info, value, action }) {
    return (
        <div className={style["data"]}>
            <label className={style["color-input"]}>
                {info}:
                <ColorPicker
                    value={value}
                    action={action}
                />
            </label>

        </div>
    );
}

export default InputDataContainer;