import { useEffect, useState } from 'react';

const defaultState = {
  millis: '00',
  secs: '00',
  hours: '00',
  minutes: '00',
};

let startDuration = null;

function getZeroAppendedString(num) {
  return ('0' + num).slice(-2);
}
function calculateTime() {
  let millisecondsPassed = new Date().getTime() - startDuration;
  let millisecondsTimer = getZeroAppendedString(
    String(millisecondsPassed % 1000).substring(0, 2)
  );
  let secondsPassed = Math.floor(millisecondsPassed / 1000);
  let secondsPassedTimer = Math.floor(millisecondsPassed / 1000) % 60;
  let minutesPassed = Math.floor(secondsPassed / 60);
  let minutesPassedTimer = Math.floor(secondsPassed / 60) % 60;
  let hoursPassed = Math.floor(minutesPassed / 60) % 24;

  secondsPassed = getZeroAppendedString(secondsPassedTimer);
  minutesPassed = getZeroAppendedString(minutesPassedTimer);
  hoursPassed = getZeroAppendedString(hoursPassed);

  return {
    millis: millisecondsTimer,
    secs: secondsPassed,
    hours: hoursPassed,
    minutes: minutesPassed,
  };
}

export default function Stopwatch() {
  let [time, setTime] = useState({
    millis: '00',
    secs: '00',
    hours: '00',
    minutes: '00',
  });
  let [isStarted, setIsStarted] = useState(false);
  let [interval, _setInterval] = useState(null);
  useEffect(() => {
    return () => {
      if (interval) {
        clearInterval(interval);
        _setInterval(null);
      }
    };
  }, []);

  function startTimer() {
    if (!isStarted) {
      startDuration = new Date().getTime();
      _setInterval(
        setInterval(() => {
          setTime(calculateTime());
        }, 20)
      );
    }
    setIsStarted((bIsStarted) => !bIsStarted);
  }

  function resetTimer() {
    setTime(defaultState);
    setIsStarted(false);
    clearInterval(interval);
    _setInterval(null);
    startDuration = null;
  }
  return (
    <div className='container'>
      <div className='clock'>
        <div className='heading-bar'>
          <span>Clock</span>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAApZJREFUSEuVloFx2zAMRR8mqDdoNqg7gZ0J6hHSCewNWm9gT+CMkExgeYN0A2cDdwL2IFIWQYKSq7vkEpHEBz4+PiW4jwDhP1f8SK23igAOTv6q/3v8lWK1kmsnPSYhPaQNNH3uBfjaqOIT4TVlOJMcyCP5Zax0wKoBfAHWbcIth4bqis28D/FcJ7Dyu08b2AmcUT2T6yQ1djH9twC2AvtaHwPVaecDtD/1VAtLAsuU6gegP+/ALSlVQc/Q73kFfup7Idxnpa7YR1fAX4CKq5RjPhYKsgcWCB2BL2nzEWQ3jqhRdcq1Bt4InIIGm3iyY7dYIVdAxaiPiu5j3FMAV3GFF4Kccor8uXdpUvABTFthuGqKS2AZhDPBrTRXcGvEtN/PEArQiN+Y474CJ+BdID5wXbjGePY61AJeC+Ecx8Bt7AVknRY7kJUVzqhe4HtUfTFylSdHnIPAtmEUuj5Jde4XAscg7MoCTI8z1XUQ7tboJNdXnEQ3tqRiqH9xQVhXwLnEM17rYm3Qguqmfw8E9wWWBXhNNMBOcjqrg1rVncyMOwxV05OJK/dNuUJoXX+u2vK+Fhv0unwyXhnMOBku34AfQ4BJD3d8vtj/jrDxxZXSzRxKPfnUdMjJTKpT6mDq4bHHd6yy6/HcQuAaUJN3UB4H/gvoBaOasKY5EeN3vJGSW9WseCmV4fcQNE71YVeprTjZz6gvnNmyR5PJkx40MXNcx0TBvzX77S/8iVeh3KY+k52jdhKFcAjCVpXpm5N5fwR2lVsMxm/ElaCrwbd9VZHsgE38xDUpfAq8BThA7wHtWc+wHmPRZrUovrlujrs5khqh5sTlJzVvGrPFZMD2K3ASMV+s+tPGzKcjArcUM5u3tyGf+3aAf9GYATVdLALyAAAAAElFTkSuQmCC"/>
        </div>
        <div className='timer-container'>
          <div className='stripes'>
            <div className='timer'>
              {time.hours}:{time.minutes}:{time.secs}:{time.millis}
            </div>
          </div>
        </div>
        <div className='spacer' />
        <div className='button-container'>
          <div
            onClick={startTimer}
            className={`button ${isStarted ? 'active' : ''}`}
          >
            {isStarted ? 'Stop' : 'Start'}
          </div>
          <div onClick={resetTimer} className='button'>
            Reset
          </div>
        </div>
      </div>
    </div>
  );
}