import { useContext } from "react";
import TemaContext from "../kontekst";
import "./OrderSuccess.css"

function SummaryInfo({ data }) {
    const theme = useContext(TemaContext);
    const backgroundStyle = (theme === "dark" ? "darkBackground" : "");
    const styledText = (theme === "dark" ? "yellowText" : "grayText");

    return (
        <div className={`summaryInfoBox ${backgroundStyle}`}>
            <h2 className={styledText}>Detalji narudžbe</h2>
            <div className="orderDetails">
                <div>
                    <span className={styledText}>Kontakt:</span>
                    <span>{data.email}</span>
                </div>
                <div>
                    <span className={styledText}>Ime:</span>
                    <span>{data.name}</span>
                </div>
                <div>
                    <span className={styledText}>Država:</span>
                    <span>{data.country}</span>
                </div>
                <div>
                    <span className={styledText}>Adresa:</span>
                    <span>{data.address}</span>
                </div>
                <div>
                    <span className={styledText}>Način plaćanja:</span>
                    <span>{data.paymentOption}</span>
                </div>
            </div>
        </div>
    );
}

export default SummaryInfo;