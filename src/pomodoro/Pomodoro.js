import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import duration, {
  minutesToDuration,
  secondsToDuration,
} from "../utils/duration";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // this holds the time for focus and break
  const [focusTime, setFocusTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [timerState, setTimerState] = useState("stop");
  const [focusTimer, setFocusTimer] = useState(1500);
  const [breakTimer, setBreakTimer] = useState(300);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // // Focus Duration time display and increase decrease buttons
  const increaseFocusTime = () => setFocusTime(focusTime + 300);
  const decreaseFocusTime = () => setFocusTime(focusTime - 300);

  // // Break Duration time display and increase decrease buttons
  const increaseBreakTime = () => setBreakTime(breakTime + 60);
  const decreaseBreakTime = () => setBreakTime(breakTime - 60);

  const displayFocusTimer = () =>
    focusTime === 3600 ? "60:00" : secondsToDuration(focusTime);

  const displaySessionTitle = () =>
    timerState === "focus"
      ? `Focusing for ${secondsToDuration(focusTimer)} minutes`
      : `On Break for ${secondsToDuration(breakTimer)} minutes`;

  const displayRemainingTime = () =>
    timerState === "focus"
      ? `${secondsToDuration(focusTimer)} remaining`
      : `${secondsToDuration(breakTimer)} remaining`;
  useInterval(
    () => {
      setIsTimerRunning(true);
      if (isTimerRunning) {
        setTimeRemaining((focusTime) => focusTime - 1);
        if (timeRemaining <= 1) {
          setTimerState(false);
          setTimeRemaining(breakTime);
        }
      }
      if (!timerState) {
        setTimeRemaining((breakTime) => breakTime - 1);
        if (timeRemaining <= 1) {
          setTimerState(true);
          setTimeRemaining(focusTime);
        }
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setTimerState((state) => (state === "stop" ? "focus" : state));
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {secondsToDuration(focusTime)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocusTime}
                disabled={isTimerRunning || focusTime <= 300}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={increaseFocusTime}
                disabled={isTimerRunning}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {secondsToDuration(breakTime)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={decreaseBreakTime}
                  disabled={isTimerRunning || breakTime <= 60}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreakTime}
                  disabled={isTimerRunning || breakTime >= 900}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              disabled={!isTimerRunning}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">{displaySessionTitle()}</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {displayRemainingTime()}
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
