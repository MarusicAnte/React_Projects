function Score({ homeScore, awayScore, matchOver, elapsedTime, halfTime, children }) {
    return (
        <div className='matchScore'>
            <p className="matchStatus">{halfTime}</p>
            <p className='scores'>{homeScore} : {awayScore}</p>

            {matchOver ? <p className="matchStatus">Utakmica je završila.</p> :
                <p className="matchStatus">Proteklo vrijeme: {elapsedTime} minuta</p>}

            {children}
        </div>
    );
}

export default Score;