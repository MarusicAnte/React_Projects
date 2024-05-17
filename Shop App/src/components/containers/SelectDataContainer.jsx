import React from "react";
import SelectInput from "../inputs/SelectInput";

function SelectDataContainer({ name, value, info, action, array }) {
    return (
        <div className="data">
            <label>
                {info}:
                <SelectInput
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

export default SelectDataContainer;