import { useContext } from "react";
import TemaContext from "../kontekst";

function Input({ type, id, name, maxChar, placeholder, value, action, valid, validMessage, errorMessage }) {

    const validInput = valid ? "validStyle" : "invalidStyle";
    const theme = useContext(TemaContext);
    const darkModeStyle = (theme === "dark" ? "darkMode" : "lightMode");
    const validStyle = (theme === "dark" && valid ? "validDarkStyle" : "validStyle");
    const lightGreen = (theme === "dark" ? "lightGreen" : "");

    return (
        <>
            <input
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={action}
                maxLength={maxChar}
                className={`${validStyle} ${darkModeStyle} ${validInput}`}
            />
            {value != "" ? (
                valid ? <p className={`validInfo ${lightGreen}`}>{validMessage}</p>
                    :
                    <p className="invalidInfo">Polje {name} sadrži krivi unos. ({errorMessage})</p>
            ) : null}
        </>
    )
}

export default Input;