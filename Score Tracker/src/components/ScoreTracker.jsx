function ScoreTracker({ scoreTracker }) {
    return (
        <>
            <div className="scoreTracker">
                <h2>Kretanje rezultata:</h2>
                <div>
                    {scoreTracker.map((item, index) => (
                        <p key={index}>{item.score.home} : {item.score.away} - {item.minute} 'min</p>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ScoreTracker;