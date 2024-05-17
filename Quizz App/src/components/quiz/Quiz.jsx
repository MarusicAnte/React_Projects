import style from "./Quiz.module.css"
import Answer from "./Answer";
import { useEffect, useState } from "react";

function Quiz({ action, currentQuestion, setNextQuestion, setScore, index, totalQuestions }) {

    const [isAnswerCorrect, setIsAnswerCorrect] = useState({
        index: null,
        correct: null
    });
    const [clicked, setClicked] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [gameIsOver, setGameIsOver] = useState(false);

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const correctAns = currentQuestion.correctAnswer;
    const incorrectAns = currentQuestion.incorrectAnswer;

    useEffect(() => {
        let ans = incorrectAns.concat(correctAns);
        ans = shuffle(ans);
        setAnswers(ans);
    }, [currentQuestion])

    useEffect(() => {
        if (index !== 0 && totalQuestions !== 0 && index === totalQuestions) {
            setGameIsOver(true);
        } else {
            setGameIsOver(false);
        }
    }, [index])

    const nextQuestion = () => {
        setTimeout(() => {
            setNextQuestion(true);
            setIsAnswerCorrect({ index: null, correct: null });
            setClicked(false)
        }, 5000)
    }

    const checkAnswer = (clickedAnswer, index) => {
        setClicked(true);
        if (!incorrectAns.includes(clickedAnswer)) {
            setIsAnswerCorrect({ index, correct: true });
            setScore(prev => prev + 1);
            nextQuestion();
        } else {
            setIsAnswerCorrect({ index, correct: false });
            nextQuestion();
        }
    }

    function handleRestart() {
        action();
        setIsAnswerCorrect({ index: null, correct: null });
        setClicked(false);
        setAnswers([]);
    }

    return (
        <>
            {
                !gameIsOver ? (
                    <div className={style["quizContent"]}>
                        <div className={style["quizHeader"]}>
                            <h2>Question {currentQuestion.questionNumber}:</h2>
                            <p className={style["questionTitle"]}>{currentQuestion.question}</p>
                        </div>
                        <div className={style["answersContainer"]}>
                            {
                                answers.map((answer, index) => (
                                    <div key={answer} className={style["answerBox"]}>
                                        <Answer
                                            answer={answer}
                                            action={checkAnswer}
                                            index={index}
                                            finished={gameIsOver || clicked}
                                        />
                                        <div className={style["logoBox"]}>
                                            {
                                                isAnswerCorrect.correct !== null && isAnswerCorrect.index === index &&
                                                <img
                                                    src={isAnswerCorrect.correct ? "../src/images/check.png" : "../src/images/wrong.png"}
                                                    alt={isAnswerCorrect.correct ? "check logo" : "wrong logo"}
                                                    className={style["checkLogo"]}
                                                />
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                (clicked ? (
                                    isAnswerCorrect.correct ? <p className={style["correctMessage"]}>Correct !</p>
                                        :
                                        <p className={style["correctMessage"]}>Correct answer: {currentQuestion.correctAnswer}</p>
                                ) : null
                                )
                            }
                            <button onClick={handleRestart} className={style["restartBtn"]}>RESTART</button>
                        </div>
                    </div>
                ) : (
                    <div className={style["gameOverBox"]}>
                        <p className={style["gameOver"]}>GAME IS OVER !!!</p>
                        <button onClick={handleRestart} className={style["restartBtn"]}>RESTART</button>
                    </div>
                )
            }
        </>

    );
}

export default Quiz;