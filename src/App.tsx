import "normalize.css";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <h1>
        Tap on the card to reveal the question for an insightful 1-to-1 meeting
      </h1>
      <div className="card ">
        <div className="card__title">About Manager</div>
        <div>
          At what point in the past week were you most frustrated with or
          discouraged by your work? What can I do to help you manage that? ❧
        </div>
      </div>
      <button className="btn">Take 5 cards</button>
      <button className="btn">Select topics</button>
      <div className="footer">
        Made with ️
        <span role="img" aria-label="love">
          💜
        </span>{" "}
        by Andrey&nbsp;@&nbsp;
        <a href="https://www.byteminds.co.uk">ByteMinds</a>
        <div>
          <a href="https://github.com">Github</a>
        </div>
      </div>
    </div>
  );
}
