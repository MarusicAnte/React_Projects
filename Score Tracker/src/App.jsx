import { useState, useEffect } from 'react'
import './App.css'
import Club from './components/Club'
import Score from './components/Score'
import UpdateButton from './components/UpdateButton'
import ScoreTracker from './components/ScoreTracker'
import CardsTracker from './components/CardsTracker'


function App() {
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [halfTime, setHalfTime] = useState('Prvo poluvrijeme');
  const [isHalfTime, setIsHalfTime] = useState(false);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [scoreTracker, setScoreTracker] = useState([]);
  const [isReset, setIsReset] = useState(false);
  const matchDuration = 90;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (elapsedTime < matchDuration / 2 && !isMatchOver) {
        setIsReset(false);
        setElapsedTime(elapsedTime + 1);
      } else if (elapsedTime === matchDuration / 2 && !isMatchOver) {
        setHalfTime('Kraj prvog poluvremena!');
        setIsHalfTime(true);
        clearInterval(intervalId);
      } else if (elapsedTime > matchDuration / 2 && elapsedTime < 90) {
        setHalfTime('Drugo poluvrijeme');
        setIsHalfTime(false);
        setElapsedTime(elapsedTime + 1);
        clearInterval(intervalId);
      } else {
        setHalfTime('Kraj!');
        setIsMatchOver(true);
        clearInterval(intervalId);
      }
    }, 1000)

    return () => clearInterval(intervalId);
  }, [elapsedTime, matchDuration]);

  const resumeMatch = () => {
    setElapsedTime(elapsedTime + 1);
  }

  const goalForTeam = (team) => {
    if (isMatchOver)
      return;

    const newTeamScore = { ...score };
    newTeamScore[team]++;

    setScore(newTeamScore);

    const newTrackedScore = {
      score: { ...newTeamScore },
      minute: elapsedTime + 1,
      team: team
    }

    setScoreTracker([...scoreTracker, newTrackedScore]);
  }

  const disallowedGoalForTeam = (team) => {
    if (isMatchOver)
      return;

    const lastGoal = scoreTracker.findLast((el) => el.team === team);

    if (!lastGoal)
      return;

    const lastGoalIndex = scoreTracker.indexOf(lastGoal);
    const newScoreTracker = [...scoreTracker];
    newScoreTracker.splice(lastGoalIndex, 1);

    for (let i = lastGoalIndex; i < newScoreTracker.length; i++) {
      newScoreTracker[i].score[team]--;
    }

    setScoreTracker(newScoreTracker);
    const newScore = { ...score };
    newScore[team]--;
    setScore(newScore);
  }

  const restartMatch = () => {
    setIsReset(true);
  }

  let date = new Date();
  const todaysDate = date.toLocaleDateString();

  useEffect(() => {
    setScore({ home: 0, away: 0 });
    setScoreTracker([]);
    setElapsedTime(0);
    setHalfTime('Prvo poluvrijeme');
    setIsHalfTime(false);
    setIsMatchOver(false);
  }, [isReset])

  return (
    <>
      <div className='scoreDisplay'>
        <div className='matchDate'>{todaysDate}</div>

        <div className='scoreContentBox'>
          <Club imgURL={"../src/images/hajduk-logo.png"} alt={"Hajduk-logo"} title="Hajduk" />
          <Score
            homeScore={score.home}
            awayScore={score.away}
            matchOver={isMatchOver}
            elapsedTime={elapsedTime}
            halfTime={halfTime}
          >
            {elapsedTime === 45 ? <button className="resumeMatchBtn" onClick={resumeMatch}>Nastavak</button> : null}
            {isMatchOver ? <button className="restartMatchBtn" onClick={restartMatch}>Reset</button> : null}
          </Score>
          <Club imgURL={"../src/images/dinamo-logo.png"} alt={"Dinamo-logo"} title="Dinamo" />
        </div>

        <ScoreTracker goals={score} scoreTracker={scoreTracker} />

        <div className='updateButtonsContainer'>
          <UpdateButton
            name="homeIncrement"
            value="+"
            action={() => goalForTeam('home')}
            disabled={isMatchOver || isHalfTime}
          />
          <UpdateButton
            name="homeDecrement"
            value="-"
            action={() => disallowedGoalForTeam('home')}
            disabled={isMatchOver || isHalfTime} />
          <UpdateButton
            name="awayIncrement"
            value="+"
            action={() => goalForTeam('away')}
            disabled={isMatchOver || isHalfTime} />
          <UpdateButton
            name="awayDecrement"
            value="-"
            action={() => disallowedGoalForTeam('away')}
            disabled={isMatchOver || isHalfTime} />
        </div>
      </div>

      <div className="statisticContainer">
        <CardsTracker
          isHalfTime={isHalfTime}
          isMatchOver={isMatchOver}
          isReset={isReset}
          homeScore={score.home}
          awayScore={score.away}>
          <h2>Statistika</h2>
        </CardsTracker>
      </div>
    </>
  )
}

export default App
