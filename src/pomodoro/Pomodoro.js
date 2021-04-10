import React, { useState } from "react";
import classNames from "../utils/class-names";
import { minutesToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";
import Session from "./Session";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // this holds the time for focus and break
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  // this will allow you to switch the current timer that is running
  const [timerState, setTimerState] = useState("stop");
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Focus Duration time display and increase decrease buttons
  const increaseFocusTime = () => setFocusTime(focusTime + 5);
  const decreaseFocusTime = () => setFocusTime(focusTime - 5);
  const displayFocusTime = () =>
    focusTime === 60 ? "60:00" : minutesToDuration(focusTime);

  // Break Duration time display and increase decrease buttons
  const increaseBreakTime = () => setBreakTime(breakTime + 1);
  const decreaseBreakTime = () => setBreakTime(breakTime - 1);
  const displayBreakTime = () =>
    breakTime === 15 ? "15:00" : minutesToDuration(breakTime);

  const displaySessionTitle = () =>
    timerState === "focus"
      ? `Focusing for ${focusTime} minutes`
      : `On Break for ${breakTime} minutes`;

  const displayRemainingTime = () =>
    timerState === "focus"
      ? `${focusTime} remaining`
      : `${breakTime} remaining`;

  useInterval(() => {}, isTimerRunning ? 1000 : null);

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setTimerState((state) => (state === "stop" ? "focus" : state));
  }

  function stop() {
    setIsTimerRunning(false);
    setTimerState("stop");
    setTimeRemaining(0);
  }
  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {displayFocusTime()}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocusTime}
                disabled={isTimerRunning || focusTime <= 5}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={increaseFocusTime}
                disabled={isTimerRunning || focusTime >= 60}
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
                Break Duration: {displayBreakTime()}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={decreaseBreakTime}
                  disabled={isTimerRunning || breakTime <= 1}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreakTime}
                  disabled={isTimerRunning || breakTime >= 15}
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
              onClick={stop}
              disabled={!isTimerRunning}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Session
        isTimerRunning={isTimerRunning}
        sessionTitle={displaySessionTitle()}
        displayRemainingTime={displayRemainingTime()}
      />
    </div>
  );
}

export default Pomodoro;
