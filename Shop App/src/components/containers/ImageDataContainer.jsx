import React from "react";
import ImageInput from "../inputs/ImageInput";

function ImageDataContainer({ name, value, info, action, array }) {
    return (
        <div className="data">
            <label>
                {info}
                <ImageInput
                    name={name}
                    value={value}
                    action={action}
                    array={array}
                    info={info}
                />
            </label>
        </div>
    );
}

export default ImageDataContainer;