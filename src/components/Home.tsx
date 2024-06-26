import "../styles/Home.css";
import {Link} from 'react-router-dom';

export default function Home() {
  const presetButton = document.querySelector<HTMLButtonElement>(
    ".play-preset-button"
  );
  const macButton = document.querySelector<HTMLButtonElement>(".mac-button");
  const windowsButton =
    document.querySelector<HTMLButtonElement>(".windows-button");

  if (presetButton) {
    presetButton.addEventListener("click", function () {
      if (macButton) {
        macButton.classList.remove("hide");
      }
      if (windowsButton) {
        windowsButton.classList.remove("hide");
      }
    });
  }

  return (
    <div className="content-container">
      <div className="intro">Welcome to KeyMaster</div>
      <div className="desc">
        KeyMaster is a game that is meant to help you develop muscle memory for
        keyboard shortcut. You have the option to make your own game or play a
        game with pre set common / helpful shortcuts.
      </div>
      <div className="choices">
        <div className="question">Which would you like to do?</div>
              <Link to="/KeyMasterTypseS/build">
              <button className="build-own-button">Build you own game.</button></Link>
              <Link to="/KeyMasterTypseS/play-preset-game">
              <button className="play-preset-button">Play a preset game.</button>
              </Link>
      
        <button className="mac-button hide">Mac</button>
        <button className="windows-button hide">Windows</button>
      </div>
    </div>
  );
}
