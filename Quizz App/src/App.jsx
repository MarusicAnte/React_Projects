import { useEffect, useState } from 'react';
import './App.css'
import Input from './components/input/Input';
import Select from './components/input/Select';
import Quiz from './components/quiz/Quiz';
import Score from './components/quiz/Score';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    questionsNumber: 1,
    category: 9,
    difficulty: " ",
    type: " "
  });

  const [quizData, setQuizData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    correctAnswer: [],
    incorrectAnswer: [],
    questionNumber: 0
  });
  const [index, setIndex] = useState(0);
  const [next, setNext] = useState(false);
  const [score, setScore] = useState(0);

  const [startClick, setStartClick] = useState(false);

  const categoryOptions = [
    { name: "General knowledge", id: 9 },
    { name: "Science: Computers", id: 18 },
    { name: "Science: Mathematics", id: 19 },
    { name: "Sports", id: 21 },
    { name: "Geography", id: 22 },
    { name: "History", id: 23 }
  ]

  const difficultyOptions = [
    { name: "Any Difficulty", id: "" },
    { name: "Easy", id: "easy" },
    { name: "Medium", id: "medium" },
    { name: "Hard", id: "hard" },
  ]

  const typeOptions = [
    { name: "Any Type", id: "" },
    { name: "Multiple Choice", id: "multiple" },
    { name: "True / False", id: "boolean" }
  ]

  const handleInputChange = (field) => e => {
    const newFormData = { ...formData };
    newFormData[field] = e.target.value.toLowerCase();
    setFormData(newFormData);
  }

  const startQuizGame = () => {

    let apiUrl = " ";
    if (formData.difficulty === " " && formData.type === " ") {
      apiUrl = `https://opentdb.com/api.php?amount=${formData.questionsNumber}&category=${formData.category}`;
    } else if (formData.difficulty === " ") {
      apiUrl = `https://opentdb.com/api.php?amount=${formData.questionsNumber}&category=${formData.category}&type=${formData.type}`
    } else if (formData.type === " ") {
      apiUrl = `https://opentdb.com/api.php?amount=${formData.questionsNumber}&category=${formData.category}&difficulty=${formData.difficulty}`
    } else {
      apiUrl = `https://opentdb.com/api.php?amount=${formData.questionsNumber}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`
    }

    axios
      .get(apiUrl)
      .then(data => setQuizData(data.data.results))
      .catch(error => window.alert(error))

    setTimeout(() => {
      setStartClick(true);
    }, 500);
  }

  useEffect(() => {
    const fetchedQuestions = quizData.map(data => ({
      question: data.question,
      correctAnswer: data.correct_answer,
      incorrectAnswer: data.incorrect_answers
    }));

    setQuestions(fetchedQuestions);
  }, [quizData])

  useEffect(() => {
    if (questions.length > 0 && index <= questions.length - 1) {
      const newCurrentQuestion = { ...currentQuestion };
      newCurrentQuestion.question = questions[index].question;
      newCurrentQuestion.correctAnswer = questions[index].correctAnswer;
      newCurrentQuestion.incorrectAnswer = questions[index].incorrectAnswer;
      newCurrentQuestion.questionNumber = index + 1;

      setCurrentQuestion(newCurrentQuestion);
    }
  }, [questions, index])

  useEffect(() => {
    if (next) {
      setNext(false);
      setIndex(prev => prev + 1);
    }
  }, [next])

  const restartQuizGame = () => {
    const newFormData = { ...formData };
    newFormData.questionsNumber = 1;
    newFormData.category = 9;
    setFormData(newFormData);
    setQuizData([]);
    setQuestions([]);
    setIndex(0);
    setCurrentQuestion({
      question: "",
      correctAnswer: [],
      incorrectAnswer: [],
      questionNumber: 0
    })
    setStartClick(false);
    setNext(false);
    setScore(0);
  }

  return (
    <>
      {!startClick ? (
        <div className='inputForm'>
          <h1>WELCOME TO QUIZ</h1>
          <div className='inputContainer'>
            <Input action={handleInputChange("questionsNumber")} value={formData.questionsNumber} />
            <Select
              label="Select Category"
              name="category"
              id="category"
              optionValues={categoryOptions}
              action={handleInputChange("category")}
            />
            <Select
              label="Select Difficulty"
              name="difficulty"
              id="difficulty"
              optionValues={difficultyOptions}
              action={handleInputChange("difficulty")}
            />
            <Select
              label="Select Type"
              name="type"
              id="type"
              optionValues={typeOptions}
              action={handleInputChange("type")}
            />
            <button onClick={startQuizGame} className="startBtn">START</button>
          </div>
        </div>
      ) : (
        <div className="quizContainer">
          <Quiz
            action={() => restartQuizGame()}
            currentQuestion={currentQuestion}
            setNextQuestion={setNext}
            setScore={setScore}
            index={index}
            totalQuestions={questions.length}
          />
          <Score
            total={questions.length}
            currentQuestion={currentQuestion.questionNumber}
            score={score}
          />
        </div>
      )}
    </>
  );
}

export default App
