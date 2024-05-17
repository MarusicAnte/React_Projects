import { useState } from "react";
import style from "./Quiz.module.css"

function Answer({ answer, action, index, finished }) {
    const [isClicked, setIsClicked] = useState(false);

    function handleAnswerButton() {
        setIsClicked(!isClicked);
        action(answer, index);
    }

    const answeStyle = isClicked ? "clickedAnswer" : "answer";

    return (
        <button className={style[answeStyle]} disabled={finished} onClick={handleAnswerButton}>
            {answer}
        </button>
    );
}

export default Answer;