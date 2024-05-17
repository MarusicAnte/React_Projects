import { useContext } from "react";
import TemaContext from "./kontekst";

function FormContainer({ title, className, children }) {
    const theme = useContext(TemaContext);
    const darkModeStyle = (theme == "dark" ? "yellowStyle" : " ");
    const yellowSpan = (theme == "dark" ? "yellowSpan" : "graySpan");

    return (
        <div className={className}>
            <span className={yellowSpan}>{title}</span>
            <div className={`inputContainer ${darkModeStyle}`}>
                {children}
            </div>
        </div>

    );
}

export default FormContainer;