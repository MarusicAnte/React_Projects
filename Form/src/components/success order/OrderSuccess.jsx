import { useContext } from "react";
import TemaContext from "../kontekst";
import "./OrderSuccess.css"

function OrderSuccess({ children }) {
    const theme = useContext(TemaContext);
    const backgroundStyle = (theme === "dark" ? "darkBackground" : "");

    return (
        <>
            <div className={`orderSuccess ${backgroundStyle}`}>
                <h2 className="orderStatus">Narudžba uspješna!</h2>
                <p>Hvala na kupnji.</p>
            </div>
            {children}
        </>

    );
}

export default OrderSuccess;