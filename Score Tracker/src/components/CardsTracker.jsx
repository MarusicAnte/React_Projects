import RefereeComponent from "./RefereeComponent";

function CardsTracker({ children, isHalfTime, isMatchOver, isReset, homeScore, awayScore }) {
    return (
        <>
            <div className="cardsTracker">
                {children}
                <div>
                    <RefereeComponent title="Domaći" score={homeScore} disabled={isHalfTime || isMatchOver} isReset={isReset} />
                    <RefereeComponent title="Gosti" score={awayScore} disabled={isHalfTime || isMatchOver} isReset={isReset} />
                </div>
            </div>
        </>
    );
}

export default CardsTracker;