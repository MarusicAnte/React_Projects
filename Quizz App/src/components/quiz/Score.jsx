import style from "./Quiz.module.css"

function Score({ total, currentQuestion, score }) {
    return (
        <div className={style["scoreContainer"]}>
            <p>Question:</p>
            <span className={style["scoreTracker"]}>{currentQuestion} / {total}</span>
            <p>Score:</p>
            <span>{score}</span>
        </div>
    );
}

export default Score;