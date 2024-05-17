import { useContext } from "react";
import TemaContext from "../kontekst";

function Select({ value, action }) {
    const theme = useContext(TemaContext);
    const selectStyle = (theme === "dark" ? "graySelect" : "whiteSelect");

    return (
        <select name={"country"} id="country" value={value} onChange={action} className={selectStyle}>
            <option value="Hrvatska">Hrvatska</option>
            <option value="Bosna i Hercegovina">Bosna i Hercegovina</option>
            <option value="Crna Gora">Crna Gora</option>
            <option value="Slovenija">Slovenija</option>
            <option value="Srbija">Srbija</option>
        </select>
    );
}

export default Select;