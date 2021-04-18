import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function Session({
  currentMode,
  focusTime,
  breakTime,
  timeRemaining,
  isTimerRunning,
  isSessionActive,
}) {
  let currentDuration = currentMode === "focus" ? focusTime : breakTime;
  let percent = (1 - timeRemaining / (currentDuration * 60)) * 100;
  if (!isSessionActive) {
    return null;
  }
  return (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}

      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {currentMode === "focus"
              ? `Focusing for ${minutesToDuration(focusTime)} minutes`
              : `On Break for ${minutesToDuration(breakTime)} minutes`}
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(timeRemaining)} remaining
          </p>
          <h3>{!isTimerRunning && isSessionActive ? "PAUSED" : null}</h3>
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
              aria-valuenow={percent} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${percent}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Session;
