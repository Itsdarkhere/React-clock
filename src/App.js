
import './App.css';
import { useEffect, useState } from 'react'


function App() {

  const [pause, setPause] = useState(5);
  const [[m, s], setTime] = useState([25, 0]);
  const [adjust, setAdjust] = useState(25);
  const [adjustPause, setAdjustPause] = useState(5);
  const [active, setActive] = useState(false);
  const [tauko, setTauko] = useState(false);


  const incrementPause = () => {
    if (!active) {
      if (adjustPause < 60) {
        if (tauko) {
          setAdjustPause(adjustPause + 1);
          setTime([adjustPause + 1, 0]);
        } else {
          setPause(pause + 1);
          setAdjustPause(adjustPause + 1);
        }
      }
    }
  }
  const decrementPause = () => {
    if (!active) {
      if (adjustPause > 1) {
        if (tauko) {
          setAdjustPause(adjustPause - 1);
          setTime([adjustPause - 1, 0]);
        } else {
          setPause(pause - 1);
          setAdjustPause(adjustPause - 1);
        }
      }
    }
  }
  const incrementTime = () => {
    if (!active) {
      if (adjust < 60) {
        setAdjust(adjust + 1);
        setTime([adjust + 1, 0]);
      } 
    }
  }
  const decrementTime = () => {
    if(!active) {
      if (adjust > 1) {
        setAdjust(adjust - 1);
        setTime([adjust - 1, 0]);
      }
    }
  }

  const reset = () => {
    setTauko(false);
    setActive(false);
    setAdjust(25);
    setAdjustPause(5);
    setTime([25, 0]);
  }

  const tick = () => {
    if (active) {
      if (s != 0) {
        setTime([m, s - 1]);

      } else {
        if (m == 0) {
          if (tauko) {
            setTauko(false);
            setTime([adjust, 0]);  
          } else {
            setTauko(true);
            setTime([adjustPause, 0]);
          }
        } else {
          setTime([m - 1, 59 ]);
        }
      }
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval)
  })
  
  return (
    <div id="Container">
      <div id="box">

        <div id="title">
          <h1>{adjust} + {adjustPause} Clock</h1>
        </div>

        <div id="editor-holder">
          <div id="break-label" className="editor">
            <h3 className="small-title">Break Length</h3>

            <div className="item-box">
              <div id="break-increment" className="fa fa-arrow-up fa-2x"onClick={incrementPause}></div>
              <h3 id="break-length">{adjustPause}</h3>
              <div id="break-decrement" className="fa fa-arrow-down fa-2x"onClick={decrementPause}></div>
            </div>

          </div>

          <div id="session-label" className="editor"> 
            <h3 className="small-title">Session Length</h3>

            <div className="item-box">
              <div id="session-increment" className="fa fa-arrow-up fa-2x" onClick={incrementTime}></div>
              <h3 id="session-length">{adjust}</h3>
              <div id="session-decrement" className="fa fa-arrow-down fa-2x" onClick={decrementTime}></div>
            </div>

          </div>
        </div>

        <div id="clock-holder">
          <div id="clock">
            <h2 id="timer-label">{tauko ? 'Break' : 'Session'}</h2>
            <h1 id="time-left">{m < 10 ? '0'+m : m}:{s < 10 ? '0'+s : s}</h1>
          </div>
        </div>

        <div id="buttons">  
          <div id="start_stop" className="fa fa-play fa-2x" onClick={function() {setActive(active == true ? false : true)}}></div>
          <div id="stop_start" className="fa fa-pause fa-2x" onClick={function() {setActive(active == true ? false : true)}}></div>
          <div id="reset" className="fa fa-retweet fa-2x" onClick={reset}></div>
        </div>

        <div id="signature">
          <p>@Itsdarkhere</p>
          <audio id ="beep" src='https://a.pomf.cat/vwxmmf.mp3' />
        </div>

      </div>
    </div>
  );
}

export default App;
