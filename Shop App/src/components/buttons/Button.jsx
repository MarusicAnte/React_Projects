import React from "react";
import style from "./Buttons.module.css";

function Button({ className, type, action, text }) {
    return (
        <button className={style[className]} type={type} onClick={action}>
            {text}
        </button>
    );
}

export default Button;