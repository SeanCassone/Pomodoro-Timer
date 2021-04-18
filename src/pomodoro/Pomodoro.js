import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import Session from "./Session";
import Controls from "./Controls";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [currentMode, setCurrentMode] = useState("focus");

  const decreaseFocus = () => {
    setFocusTime((oldState) => Math.max(5, oldState - 5));
  };

  const increaseFocus = () => {
    setFocusTime((oldState) => Math.min(60, oldState + 5));
  };

  const decreaseBreak = () => {
    setBreakTime((oldState) => Math.max(1, oldState - 1));
  };

  const increaseBreak = () => {
    setBreakTime((oldState) => Math.min(15, oldState + 1));
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (timeRemaining === 0) {
        new Audio(`${process.env.PUBLIC_URL}/alarm/cheer-sound.mp3`).play();
        const duration = currentMode === "focus" ? breakTime : focusTime; // select the correct time duration
        setTimeRemaining(duration * 60); // set the time remaining to the new duration;
        setCurrentMode((prevMode) =>
          prevMode === "focus" ? "break" : "focus"
        );
        return;
      }
      setTimeRemaining((currentTimeRemaining) => currentTimeRemaining - 1);
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (!isSessionActive) {
      setIsSessionActive(true);
      setTimeRemaining(focusTime * 60);
    }
    setIsTimerRunning((prevState) => !prevState);
  }

  function stopTimer() {
    setIsSessionActive(false);
    setIsTimerRunning(false);
    setCurrentMode("focus");
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusTime)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocus}
                disabled={isSessionActive || isTimerRunning}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={increaseFocus}
                disabled={isSessionActive || isTimerRunning}
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
                Break Duration: {minutesToDuration(breakTime)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={decreaseBreak}
                  disabled={isSessionActive || isTimerRunning}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreak}
                  disabled={isSessionActive || isTimerRunning}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Controls
        playPause={playPause}
        stopTimer={stopTimer}
        isTimerRunning={isTimerRunning}
        isSessionActive={isSessionActive}
      />
      <Session
        currentMode={currentMode}
        focusTime={focusTime}
        breakTime={breakTime}
        timeRemaining={timeRemaining}
        isTimerRunning={isTimerRunning}
        isSessionActive={isSessionActive}
      />
    </div>
  );
}

export default Pomodoro;
