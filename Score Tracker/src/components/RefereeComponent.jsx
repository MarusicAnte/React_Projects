import RefereeCard from "./RefereeCard";

function RefereeComponent({ title, disabled, isReset, score }) {
    return (
        <div className="refereeCardContainer">
            <h3>{title}</h3>
            <RefereeCard imgURL="./src/images/shots.png" alt="shots icon" defaultValue={score} disabled={disabled} isReset={isReset} />
            <RefereeCard imgURL="./src/images/foul.png" alt="foul icon" defaultValue={0} disabled={disabled} isReset={isReset} />
            <RefereeCard imgURL="./src/images/yellow-card.png" alt="yellow card" defaultValue={0} disabled={disabled} isReset={isReset} />
            <RefereeCard imgURL="./src/images/red-card.png" alt="red card" defaultValue={0} disabled={disabled} isReset={isReset} />
        </div>
    );
}

export default RefereeComponent;